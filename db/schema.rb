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

ActiveRecord::Schema.define(version: 20171015160241) do

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.text "category_query"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "languages", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_languages_on_name", unique: true
  end

  create_table "queries", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.text "text_of_query"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_queries_on_user_id"
  end

  create_table "query_languages", force: :cascade do |t|
    t.integer "query_id"
    t.integer "language_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["language_id"], name: "index_query_languages_on_language_id"
    t.index ["query_id"], name: "index_query_languages_on_query_id"
  end

  create_table "terms", force: :cascade do |t|
    t.string "operator"
    t.integer "query_id"
    t.integer "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_terms_on_category_id"
    t.index ["query_id"], name: "index_terms_on_query_id"
  end

  create_table "translations", force: :cascade do |t|
    t.integer "language_id"
    t.integer "category_id"
    t.text "translated_query"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_translations_on_category_id"
    t.index ["language_id"], name: "index_translations_on_language_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "role"
    t.index ["username"], name: "index_users_on_username"
  end

end
