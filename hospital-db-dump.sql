--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: docker
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO docker;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: docker
--

COMMENT ON SCHEMA public IS '';


--
-- Name: QuestionType; Type: TYPE; Schema: public; Owner: docker
--

CREATE TYPE public."QuestionType" AS ENUM (
    'TEXT',
    'RANGE'
);


ALTER TYPE public."QuestionType" OWNER TO docker;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: docker
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'NURSE'
);


ALTER TYPE public."Role" OWNER TO docker;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Bed; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."Bed" (
    id integer NOT NULL,
    name character varying(90),
    "patientProfileId" integer
);


ALTER TABLE public."Bed" OWNER TO docker;

--
-- Name: Bed_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."Bed_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Bed_id_seq" OWNER TO docker;

--
-- Name: Bed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."Bed_id_seq" OWNED BY public."Bed".id;


--
-- Name: DynamicForm; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."DynamicForm" (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."DynamicForm" OWNER TO docker;

--
-- Name: DynamicForm_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."DynamicForm_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DynamicForm_id_seq" OWNER TO docker;

--
-- Name: DynamicForm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."DynamicForm_id_seq" OWNED BY public."DynamicForm".id;


--
-- Name: FormAnswer; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."FormAnswer" (
    id integer NOT NULL,
    "textAnswer" text,
    "numericAnswer" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "questionId" integer NOT NULL,
    "patientProfileId" integer,
    "userId" integer,
    type public."QuestionType" DEFAULT 'RANGE'::public."QuestionType" NOT NULL
);


ALTER TABLE public."FormAnswer" OWNER TO docker;

--
-- Name: FormAnswer_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."FormAnswer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FormAnswer_id_seq" OWNER TO docker;

--
-- Name: FormAnswer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."FormAnswer_id_seq" OWNED BY public."FormAnswer".id;


--
-- Name: FormQuestion; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."FormQuestion" (
    id integer NOT NULL,
    "questionTitle" character varying(255) NOT NULL,
    type public."QuestionType" NOT NULL,
    "minValue" integer,
    "maxValue" integer,
    "formId" integer NOT NULL,
    "isRequired" boolean DEFAULT false NOT NULL,
    "colorsIsInverted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."FormQuestion" OWNER TO docker;

--
-- Name: FormQuestion_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."FormQuestion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FormQuestion_id_seq" OWNER TO docker;

--
-- Name: FormQuestion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."FormQuestion_id_seq" OWNED BY public."FormQuestion".id;


--
-- Name: PatientProfile; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."PatientProfile" (
    id integer NOT NULL,
    name character varying(90) NOT NULL,
    medical_record_code character varying(10) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dateOfBirth" timestamp(3) without time zone
);


ALTER TABLE public."PatientProfile" OWNER TO docker;

--
-- Name: PatientProfile_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."PatientProfile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PatientProfile_id_seq" OWNER TO docker;

--
-- Name: PatientProfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."PatientProfile_id_seq" OWNED BY public."PatientProfile".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    name character varying(90) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO docker;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO docker;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO docker;

--
-- Name: Bed id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Bed" ALTER COLUMN id SET DEFAULT nextval('public."Bed_id_seq"'::regclass);


--
-- Name: DynamicForm id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."DynamicForm" ALTER COLUMN id SET DEFAULT nextval('public."DynamicForm_id_seq"'::regclass);


--
-- Name: FormAnswer id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormAnswer" ALTER COLUMN id SET DEFAULT nextval('public."FormAnswer_id_seq"'::regclass);


--
-- Name: FormQuestion id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormQuestion" ALTER COLUMN id SET DEFAULT nextval('public."FormQuestion_id_seq"'::regclass);


--
-- Name: PatientProfile id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."PatientProfile" ALTER COLUMN id SET DEFAULT nextval('public."PatientProfile_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Bed; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."Bed" (id, name, "patientProfileId") FROM stdin;
2	norval	1
8	braden	\N
9	curtis	\N
10	jaunita	\N
6	adela	2
13	\N	\N
4	\N	5
5	\N	\N
14	mauricio	\N
15	\N	\N
7	lillie	7
3	hester	8
16	\N	\N
17	\N	\N
18	iso 1	\N
19	iso 2	\N
20	iso 3	\N
\.


--
-- Data for Name: DynamicForm; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."DynamicForm" (id, title, "createdAt") FROM stdin;
3		2025-03-18 00:59:52.165
2	abc	2025-03-18 00:57:47.158
\.


--
-- Data for Name: FormAnswer; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."FormAnswer" (id, "textAnswer", "numericAnswer", "createdAt", "questionId", "patientProfileId", "userId", type) FROM stdin;
1	null	4	2025-03-18 01:01:36.574	1	1	2	RANGE
2	\N	3	2025-03-18 14:44:40.393	1	1	9	RANGE
3	\N	4	2025-03-19 15:19:36.233	1	1	\N	RANGE
7	\N	7	2025-03-20 16:42:51.426	1	2	6	RANGE
8	\N	7	2025-03-20 16:43:50.572	1	2	6	RANGE
9	\N	7	2025-03-20 16:44:57.541	1	2	6	RANGE
10	\N	7	2025-03-20 16:48:23.819	1	5	6	RANGE
11	\N	7	2025-03-20 16:52:03.311	1	6	6	RANGE
6	\N	7	2025-03-20 16:41:21.463	1	2	6	RANGE
13	\N	9	2025-03-20 20:52:22.172	1	7	9	RANGE
15	\N	8	2025-03-22 18:03:04.088	1	8	9	RANGE
16	\N	8	2025-03-22 18:09:22.869	1	8	9	RANGE
17	\N	8	2025-03-22 18:09:32.062	1	8	9	RANGE
18	\N	8	2025-03-22 18:26:36.683	1	7	9	RANGE
19	\N	5	2025-03-22 18:40:15.015	1	1	1	RANGE
20	\N	6	2025-03-22 19:03:05.754	1	5	1	RANGE
22	\N	8	2025-03-22 19:18:45.783	1	2	1	RANGE
23	\N	5	2025-03-24 15:10:56.894	1	1	1	RANGE
24	\N	5	2025-03-24 16:09:47.834	1	1	1	RANGE
25	\N	8	2025-02-18 14:44:40.393	1	1	6	RANGE
\.


--
-- Data for Name: FormQuestion; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."FormQuestion" (id, "questionTitle", type, "minValue", "maxValue", "formId", "isRequired", "colorsIsInverted") FROM stdin;
1	registro de ulceras por presão	RANGE	1	10	2	t	f
\.


--
-- Data for Name: PatientProfile; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."PatientProfile" (id, name, medical_record_code, "createdAt", "dateOfBirth") FROM stdin;
1	patient abc	10043	2025-03-17 15:42:11.693	2005-02-22 15:42:11.693
2	patient def	10044	2025-03-17 16:20:44.115	2000-02-22 15:42:11.693
3	patient fghsdasd	sdfsdfsd	2025-03-20 03:18:46.647	\N
4	Barbara Dickens DVM	asdasdd	2025-03-20 03:28:39.389	\N
5	Mitchell Hickle	zXJ4jMsda	2025-03-20 03:32:05.205	2002-10-21 17:40:42.696
6	Willis Russel V	34GH7zYZJo	2025-03-20 03:34:23.562	1971-05-28 07:35:40.637
7	Emmett Kassulke	10045	2025-03-20 20:50:45.865	1958-06-02 05:37:31.287
8	joão pedro	pro-10046	2025-03-21 15:37:46.717	2005-02-22 00:00:00
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."User" (id, email, password, role, name, "createdAt") FROM stdin;
4	elena_renner@gmail.com	$2b$10$JEkMYZgoT1Rm8XZhtpkO5.XPQDpn5QiX9y6/pXiDnUg/Yj03mCvYq	NURSE	macy	2025-03-17 00:05:16.934
6	tressie.kreiger-willms@yahoo.com	$2b$10$70HcsmudNbWi.OCmg/RRw.0saHCZ9oAmK3gZjKc5M3ff3Kg5H6fbq	NURSE	albina	2025-03-17 00:05:35.315
9	bonita32@hotmail.com	$2b$10$tMStWga./7VI5.XtswGGUONcnExjP5hXNiaCXiJg9ZGkvm/vQJ0Ti	NURSE	marcos	2025-03-17 00:05:38.733
10	kristy.hickle-blick@gmail.com	$2b$10$hdbGLB8j5y/ZjVLseFeQA.ED4ExyPqShl9pubve6rso5ZXrZmCSYG	NURSE	aurelio	2025-03-17 00:05:39.649
11	newell_heathcote8@yahoo.com	$2b$10$ct9EAPfy1GR5HcEUlCHVaeflHYgVbPw31dT1bQQUBQGANL54Z/7py	NURSE	theresia	2025-03-17 00:05:40.572
12	lorenz14@hotmail.com	$2b$10$8NBy.dXBO7/UneQXkkbOv.chOyo5Nmq8DrOz9lkxTCLaJKfO2BKCS	NURSE	lowell	2025-03-17 00:05:41.434
15	quentin_schinner26@yahoo.com	$2b$10$L4ciZbDqioqylkGmXaTTZOLW7gk.t6WFX3pMKbumHYIBIpsZnw5nq	NURSE	sage	2025-03-17 00:05:44.228
16	mackenzie.collins@gmail.com	$2b$10$9Nrehas7H8e/5t/epgf6oO/iSnG177GQflNdEqrtupyoaAxb.Hy3S	ADMIN	laron	2025-03-17 00:05:45.223
17	buddy85@hotmail.com	$2b$10$u9wa7wuuZvt9cBu13JuXHOe/VQlCwnTN00oUIL3JMXZmzXb8q/Tc6	NURSE	jordon	2025-03-17 00:10:04.099
18	viva88@yahoo.com	$2b$10$0bmvqxjLhmQ16dMRWHDnxuTM1hwmJ/TbxCfDtgX3aqZfNd6aw02I6	NURSE	elias	2025-03-17 00:11:24.663
1	admin@admin.com	$2b$10$8Pt3pTOAdUV2XnltYsEHu.PoYOJmvD.HYvDvSfoUo2tVAULmWRbNW	ADMIN	João pedro	2025-03-16 23:43:02.921
13	everett57@yahoo.com	$2b$10$/ci1quq7eDIegeTXUU1jduIJiLPq4CB7MviKsow5Wdbf2psVKzmwu	NURSE	oleta	2025-03-17 00:05:42.367
19	otis.gottlieb@gmail.com	$2b$10$TYFCWLDHcq.No8HEpvJ2y.GbupmDmXvmkgyaZyUHlkgqgZ7lObqMi	NURSE	teste de criar	2025-03-17 01:02:36.958
2	watson65@hotmail.com	$2b$10$n8KQeIQWqJLMHyps3M3KWuM6kd3J6iF1vyhrtzT.oflEW2aNUyHva	NURSE	birdie	2025-03-17 00:04:15.243
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7a6b203c-eea2-4c3b-9d69-0fbfcc2a7a60	be8462ec349f6db825a69855062dd2705269cf9bfe5d34e3afcdf8dac977ddc1	2025-03-16 23:40:01.139383+00	20250316234001_initial_schema	\N	\N	2025-03-16 23:40:01.110831+00	1
9cc98974-7ba5-4292-bcae-5ff013e013dd	b185c250bfa17474df00fbb36735df6adcb4642e361f3318c49ea0b208ef6826	2025-03-17 15:09:22.465339+00	20250317150922_update	\N	\N	2025-03-17 15:09:22.45689+00	1
a85129e4-efa7-4013-88a8-452efb88144f	6e68d1f2f1ab721ac1dbf79c1eea957d9ac22b9d803d34d4c58f0c8a400e06a8	2025-03-18 01:38:39.885005+00	20250318013839_add_field_date_of_birth_on_patient_profile	\N	\N	2025-03-18 01:38:39.881339+00	1
92230b6b-d19e-4656-8711-e94567eb8757	98e92dadc945050cb183539d0f39f21c4028cae369839fd6be8e960ec6a61a32	2025-03-19 01:30:05.555271+00	20250319013005_update_schema	\N	\N	2025-03-19 01:30:05.547667+00	1
6bf67631-1ee2-4821-aade-397d33b40271	1928d877796ad437b40118cc045e09c48430d430a024a8cb3a901293ade311ec	2025-03-20 03:05:29.767031+00	20250320030529_update_schema	\N	\N	2025-03-20 03:05:29.761958+00	1
\.


--
-- Name: Bed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."Bed_id_seq"', 20, true);


--
-- Name: DynamicForm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."DynamicForm_id_seq"', 3, true);


--
-- Name: FormAnswer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."FormAnswer_id_seq"', 25, true);


--
-- Name: FormQuestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."FormQuestion_id_seq"', 1, true);


--
-- Name: PatientProfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."PatientProfile_id_seq"', 8, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."User_id_seq"', 19, true);


--
-- Name: Bed Bed_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Bed"
    ADD CONSTRAINT "Bed_pkey" PRIMARY KEY (id);


--
-- Name: DynamicForm DynamicForm_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."DynamicForm"
    ADD CONSTRAINT "DynamicForm_pkey" PRIMARY KEY (id);


--
-- Name: FormAnswer FormAnswer_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormAnswer"
    ADD CONSTRAINT "FormAnswer_pkey" PRIMARY KEY (id);


--
-- Name: FormQuestion FormQuestion_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormQuestion"
    ADD CONSTRAINT "FormQuestion_pkey" PRIMARY KEY (id);


--
-- Name: PatientProfile PatientProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."PatientProfile"
    ADD CONSTRAINT "PatientProfile_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Bed_patientProfileId_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX "Bed_patientProfileId_key" ON public."Bed" USING btree ("patientProfileId");


--
-- Name: PatientProfile_medical_record_code_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX "PatientProfile_medical_record_code_key" ON public."PatientProfile" USING btree (medical_record_code);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Bed Bed_patientProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Bed"
    ADD CONSTRAINT "Bed_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES public."PatientProfile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FormAnswer FormAnswer_patientProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormAnswer"
    ADD CONSTRAINT "FormAnswer_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES public."PatientProfile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FormAnswer FormAnswer_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormAnswer"
    ADD CONSTRAINT "FormAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."FormQuestion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: FormAnswer FormAnswer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormAnswer"
    ADD CONSTRAINT "FormAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FormQuestion FormQuestion_formId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."FormQuestion"
    ADD CONSTRAINT "FormQuestion_formId_fkey" FOREIGN KEY ("formId") REFERENCES public."DynamicForm"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: docker
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

