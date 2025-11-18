import {
  Client,
  type DataSourceObjectResponse,
  type PageObjectResponse,
} from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import type { Project } from '@/lib/types/project';

const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});
const notionClient = new NotionAPI({
  authToken: process.env.NOTION_TOKEN_V2,
  activeUser: process.env.NOTION_USER,
});
const sourceId = process.env.NOTION_SOURCE_ID;

/**
 * data source의 속성 값을 추출하는 함수
 * @param prop
 */
const extractPropertyValue = <T extends string | string[]>(
  prop:
    | PageObjectResponse['properties'][string]
    | DataSourceObjectResponse['properties'][string],
): T => {
  const type = prop.type;

  if (type === 'title' && Array.isArray(prop.title)) {
    return prop.title?.[0]?.plain_text as T;
  }
  if (type === 'rich_text' && Array.isArray(prop.rich_text)) {
    return prop.rich_text?.[0]?.plain_text as T;
  }
  if (type === 'multi_select' && Array.isArray(prop.multi_select)) {
    return prop.multi_select.map((item: { name: string }) => item.name) as T;
  }
  if (
    type === 'files' &&
    Array.isArray(prop.files) &&
    'file' in prop.files[0]
  ) {
    return prop.files?.[0]?.file.url as T;
  }
  throw new Error(`알 수 없는 타입 또는 처리할 수 없음 : ${type}`);
};

/**
 * 프로젝트 목록을 가져오는 함수
 */
export const getProjects = async () => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: sourceId!,
    });

    return response.results
      .map((result) => {
        if ('properties' in result) {
          const props = result.properties;
          return {
            id: result.id,
            title: extractPropertyValue<string>(props.title) || '',
            description: extractPropertyValue<string>(props.description) || '',
            tags: extractPropertyValue<string[]>(props.tags) || [],
            image: extractPropertyValue<string>(props.thumbnail) || '',
            body: '',
          };
        }
      })
      .filter((d) => !!d);
  } catch (error) {
    console.error('Notion database query failed:', error);
    throw error;
  }
};

/**
 * 프로젝트 상세를 가져오는 함수
 * @param id 프로젝트 페이지의 아이디
 */
export const getProjectDetail = async (id: string) => {
  try {
    const [recordMap, pageData] = await Promise.all([
      notionClient.getPage(id),
      notion.pages.retrieve({
        page_id: id,
      }),
    ]);

    let props: Pick<
      Project,
      | 'title'
      | 'description'
      | 'tags'
      | 'image'
      | 'github_url'
      | 'application_url'
    > = {
      description: '',
      image: '',
      tags: [],
      title: '',
    };

    if ('properties' in pageData) {
      const _props = pageData.properties;
      props = {
        title: extractPropertyValue<string>(_props.title) || '',
        description: extractPropertyValue<string>(_props.description) || '',
        tags: extractPropertyValue<string[]>(_props.tags) || [],
        image: extractPropertyValue<string>(_props.thumbnail) || '',
        github_url:
          _props.github_url && extractPropertyValue<string>(_props.github_url),
        application_url:
          _props.application_url &&
          extractPropertyValue<string>(_props.application_url),
      };
    }

    return {
      recordMap,
      props,
    };
  } catch (error) {
    console.error('Notion database query failed:', error);
    return null;
  }
};
