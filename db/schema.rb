# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160425190104) do

  create_table "author_items", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer  "user_id",                    null: false
    t.boolean  "visible",    default: true
    t.boolean  "public",     default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["user_id"], name: "index_author_items_on_user_id", using: :btree
  end

  create_table "author_site_storage_widgets", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer  "site_storage_id"
    t.integer  "widget_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["site_storage_id"], name: "index_author_site_storage_widgets_on_site_storage_id", using: :btree
    t.index ["widget_id"], name: "index_author_site_storage_widgets_on_widget_id", using: :btree
  end

  create_table "author_site_storages", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.string  "uuid"
    t.string  "key"
    t.integer "site_type_id"
    t.integer "item_id"
  end

  create_table "author_site_storages_users", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer "site_storage_id"
    t.integer "user_id"
    t.index ["site_storage_id"], name: "index_author_site_storages_users_on_site_storage_id", using: :btree
    t.index ["user_id"], name: "index_author_site_storages_users_on_user_id", using: :btree
  end

  create_table "author_site_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.string  "name"
    t.integer "item_id"
  end

  create_table "author_site_versions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer "version"
    t.integer "site_storage_id"
    t.boolean "activated",                        default: false
    t.text    "content",         limit: 16777215
    t.integer "item_id"
    t.text    "screenshot",      limit: 16777215
    t.boolean "published",                        default: false
    t.index ["site_storage_id"], name: "index_author_site_versions_on_site_storage_id", using: :btree
  end

  create_table "author_widget_categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.string  "name_index"
    t.string  "name_value"
    t.integer "item_id"
  end

  create_table "author_widgets", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer "widget_category_id"
    t.string  "uuid"
    t.string  "name"
    t.text    "description",        limit: 16777215
    t.text    "thumbnail",          limit: 16777215
    t.integer "width"
    t.integer "height"
    t.string  "resource"
    t.boolean "is_external",                         default: false
    t.string  "external_resource"
    t.integer "item_id"
  end

  create_table "error_logs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer  "user_log_id"
    t.string   "name"
    t.text     "message",     limit: 65535
    t.text     "exception",   limit: 65535
    t.text     "backtrace",   limit: 16777215
    t.boolean  "is_fixed",                     default: false
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.index ["user_log_id"], name: "index_error_logs_on_user_log_id", using: :btree
  end

  create_table "roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_logs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer  "user_id"
    t.string   "remote_addr"
    t.string   "session_id"
    t.integer  "status"
    t.string   "method"
    t.string   "controller"
    t.string   "action"
    t.string   "domain"
    t.text     "request_uri",     limit: 65535
    t.text     "url",             limit: 65535
    t.string   "request_format"
    t.string   "protocol"
    t.string   "host"
    t.string   "port"
    t.text     "user_params",     limit: 16777215
    t.text     "user_session",    limit: 65535
    t.text     "query_string",    limit: 65535
    t.string   "http_accept"
    t.boolean  "ssl"
    t.boolean  "xhr"
    t.string   "referer"
    t.string   "http_user_agent"
    t.string   "server_software"
    t.string   "content_type"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["user_id"], name: "index_user_logs_on_user_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "provider"
    t.string   "uid"
    t.integer  "role_id"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,  null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "name"
    t.string   "image"
    t.datetime "last_seen"
    t.integer  "item_id"
    t.string   "original_email"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["role_id"], name: "index_users_on_role_id", using: :btree
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree
  end

  create_table "vulnerability_storages", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin" do |t|
    t.integer  "site_storage_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["site_storage_id"], name: "index_vulnerability_storages_on_site_storage_id", using: :btree
  end

end
