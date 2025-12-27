import {eq} from "drizzle-orm";

import {db} from "@/database";
import {historyTable} from "@/database/schema/history.schema";

export const getLearnings = () => db
    .select()
    .from(historyTable)
    .where(eq(historyTable.type, 'learning'));

export const getCertifications = () => db
    .select()
    .from(historyTable)
    .where(eq(historyTable.type, 'certification'));