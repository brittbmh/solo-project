CREATE TABLE "Person" (
    "id" SERIAL PRIMARY KEY,
    "first_name" varchar(20) NOT NULL,
    "last_name" varchar(25) NOT NULL,
    "email" varchar(35) UNIQUE NOT NULL,
    "password" int NOT NULL,
    "username" varchar(20) NOT NULL
);

CREATE TABLE "Party_Types" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(15) NOT NULL
);

CREATE TABLE "Events" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(30) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "party_type_id" int NOT NULL REFERENCES "Party_Types",
    "date" DATE NOT NULL,
    "time_start" TIME NOT NULL,
    "end_time" TIME,
    "host" int NOT NULL REFERENCES "Person"
);

CREATE TABLE "Info_Fields" (
    "id" SERIAL PRIMARY KEY,
    "description" varchar(20) NOT NULL,
    "type" varchar(15) NOT NULL
);

CREATE TABLE "RSVP" (
    "id" SERIAL PRIMARY KEY,
    "guest_id" int NOT NULL REFERENCES "Person",
    "event_id" int NOT NULL REFERENCES "Events",
    "attending" BOOLEAN NOT NULL
);

CREATE TABLE "Party_Types_Info_Fields" (
    "id" SERIAL PRIMARY KEY,
    "party_type_id" int NOT NULL REFERENCES "Party_Types",
    "info_field_id" int NOT NULL REFERENCES "Info_Fields"
);

CREATE TABLE "Event_Info_Fields" (
    "id" SERIAL PRIMARY KEY,
    "event_id" int NOT NULL REFERENCES "Events",
    "info_field_id" int NOT NULL REFERENCES "Info_Fields"
);

CREATE TABLE "RSVP_Info_Fields" (
    "id" SERIAL PRIMARY KEY,
    "rsvp_id" int NOT NULL REFERENCES "RSVP",
    "info_id" int NOT NULL REFERENCES "Info_Fields",
    "response" TEXT
);

STRETCH
CREATE TABLE "Info_Field_Dropdown" (
	"id" SERIAL PRIMARY KEY,
	"info_field_id" int NOT NULL REFERENCES "Info_Fields",
	"dropdown_id" int NOT NULL REFERENCES "Dropdown"
);

STRETCH
CREATE TABLE "Dropdown" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(25) NOT NULL
);