import { contactTable } from '@/database/schema/contact.schema';

export namespace ContactTable {
  type Select = typeof contactTable.$inferSelect;
  type Insert = typeof contactTable.$inferInsert;
}
