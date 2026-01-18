import { pgTable, uuid, varchar, text, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core'

export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  teamSize: varchar('team_size', { length: 50 }),
  timeline: varchar('timeline', { length: 100 }),
  budget: varchar('budget', { length: 100 }),
  message: text('message'),
  referral: varchar('referral', { length: 100 }),
  score: integer('score').default(0),
  qualified: boolean('qualified').default(false),
  status: varchar('status', { length: 50 }).default('new'), // new, contacted, qualified, converted, lost
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: index('leads_email_idx').on(table.email),
  statusIdx: index('leads_status_idx').on(table.status),
  qualifiedIdx: index('leads_qualified_idx').on(table.qualified),
}))

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description').notNull(),
  priceFrom: integer('price_from'),
  features: text('features').array(),
  active: boolean('active').default(true),
  sortOrder: integer('sort_order').default(0),
})

export const portfolioProjects = pgTable('portfolio_projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description').notNull(),
  technologies: text('technologies').array(),
  imageUrl: varchar('image_url', { length: 500 }),
  projectUrl: varchar('project_url', { length: 500 }),
  featured: boolean('featured').default(false),
  sortOrder: integer('sort_order').default(0),
})

// Admin users table (for Supabase Auth integration)
export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 50 }).default('admin'), // admin, superadmin
  createdAt: timestamp('created_at').defaultNow(),
})

// Activity log for audit trail
export const activityLogs = pgTable('activity_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: uuid('admin_id').references(() => adminUsers.id),
  action: varchar('action', { length: 100 }).notNull(), // lead_created, lead_updated, etc.
  entityType: varchar('entity_type', { length: 50 }), // lead, service, etc.
  entityId: uuid('entity_id'),
  metadata: text('metadata'), // JSON string
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  adminIdIdx: index('activity_logs_admin_id_idx').on(table.adminId),
  createdAtIdx: index('activity_logs_created_at_idx').on(table.createdAt),
}))
