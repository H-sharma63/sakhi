import { pgTable, serial, jsonb, varchar, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerDetails: jsonb('customer_details').$type<{
    name: string;
    email: string;
    mobile: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
  }>().notNull(),
  items: jsonb('items').$type<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[]>().notNull(),
  total: integer('total').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  paymentStatus: varchar('payment_status', { length: 50 }).notNull().default('pending'),
  orderDate: timestamp('order_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  address: varchar('address', { length: 500 }).notNull(),
  pincode: varchar('pincode', { length: 10 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export type Address = {
  id: number;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type NewAddress = Omit<Address, 'id' | 'createdAt' | 'updatedAt'>;
