Password: 
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
-- Name: Role; Type: TYPE; Schema: public; Owner: docker
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'HEALTHCARE_AGENT'
);


ALTER TYPE public."Role" OWNER TO docker;

SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- Name: form_food_addiction_answers; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.form_food_addiction_answers (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    q1 smallint,
    q2 smallint,
    q3 smallint,
    q4 smallint,
    q5 smallint,
    q6 smallint,
    q7 smallint,
    q8 smallint,
    q9 smallint,
    q10 smallint,
    q11 smallint,
    q12 smallint,
    q13 smallint,
    origem character varying(30),
    identificador_paciente character varying(30)
);


ALTER TABLE public.form_food_addiction_answers OWNER TO docker;

--
-- Name: form_food_addiction_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.form_food_addiction_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.form_food_addiction_answers_id_seq OWNER TO docker;

--
-- Name: form_food_addiction_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.form_food_addiction_answers_id_seq OWNED BY public.form_food_addiction_answers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    name character varying(90) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO docker;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO docker;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: form_food_addiction_answers id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.form_food_addiction_answers ALTER COLUMN id SET DEFAULT nextval('public.form_food_addiction_answers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
31ed047b-e762-4ed7-9014-ce518cd988ea	d95fffa6b568dd310136a0d115c032bba9fcb53897d89ba24a0020c21467d3ab	2025-04-07 01:25:35.732922+00	20250405011219_first_migration	\N	\N	2025-04-07 01:25:35.717712+00	1
\.


--
-- Data for Name: form_food_addiction_answers; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.form_food_addiction_answers (id, "createdAt", "userId", q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, origem, identificador_paciente) FROM stdin;
2	2022-10-10 14:19:51.026	1	0	1	2	3	4	5	6	7	6	5	4	3	2	N/A	1
3	2022-10-11 13:39:58.135	1	5	6	0	0	4	3	0	3	0	0	3	0	2	N/A	11101
4	2022-10-11 14:54:35.152	1	0	4	0	5	3	5	5	7	5	6	3	0	7	N/A	11102
5	2022-10-14 10:33:38.867	1	3	3	0	0	1	1	0	1	3	0	0	0	3	N/A	1401
6	2022-11-09 07:35:44.734	1	3	3	0	6	5	3	0	0	0	1	0	7	0	N/A	36
7	2022-11-30 07:39:57.997	1	0	2	0	0	1	0	0	0	1	0	7	0	0	N/A	11
8	2022-11-30 07:47:38.796	1	0	3	0	0	2	2	0	1	0	2	0	0	0	N/A	12
9	2022-11-30 08:10:19.276	1	2	7	0	3	3	1	1	7	2	0	3	0	7	N/A	33
10	2022-11-30 08:18:21.959	1	2	3	0	2	5	7	7	1	0	0	2	0	2	N/A	14
11	2022-11-30 08:31:41.985	1	0	2	0	0	0	0	0	0	1	0	0	0	7	N/A	55
12	2022-11-30 08:45:48.739	1	1	1	0	0	7	7	7	7	1	0	7	0	1	N/A	56
13	2023-01-17 10:32:38.183	1	5	5	1	3	5	5	0	5	3	4	1	0	1	Rede Privada	15
14	2023-01-18 15:26:01.097	1	1	1	1	4	5	1	5	5	0	1	7	1	7	Rede Privada	102
15	2023-02-13 12:29:09.352	1	0	1	0	1	0	0	0	1	0	0	3	0	1	Rede Pública	1
16	2023-02-14 08:58:02.232	1	4	3	0	2	2	3	1	2	0	0	0	0	0	Rede Pública	100
17	2023-02-14 09:31:09.25	1	2	3	0	1	1	2	0	0	0	0	2	2	0	Rede Pública	101
18	2023-02-14 10:25:33.849	1	0	3	0	1	0	2	2	7	6	0	1	0	0	Rede Pública	102
19	2023-02-15 05:36:29.104	1	0	1	3	7	7	7	7	6	6	6	7	6	6	Rede Pública	104
20	2023-02-15 05:39:00.426	1	5	5	3	3	3	3	5	5	3	0	5	0	5	Rede Pública	105
21	2023-02-15 05:43:12.425	1	0	0	1	1	1	1	1	3	2	3	7	0	5	Rede Pública	103
22	2023-03-13 13:14:17.947	1	5	4	0	7	5	7	5	4	5	4	7	0	2	Rede Privada	26
23	2023-04-11 08:47:12.178	1	2	1	0	0	1	2	2	1	0	0	0	0	0	Rede Pública	106
24	2023-04-11 09:05:29.063	1	1	1	0	1	0	0	0	1	1	0	0	0	0	Rede Pública	107
25	2023-04-11 09:13:08.866	1	1	1	1	1	1	0	1	1	1	1	1	1	1	Rede Pública	107
26	2023-04-11 09:19:33.522	1	0	1	0	0	1	0	2	0	1	1	0	0	0	Rede Pública	109
27	2023-04-12 16:22:49.725	1	1	2	1	0	3	4	4	7	0	0	7	0	4	Rede Pública	110
28	2023-04-17 09:28:44.169	1	0	1	0	1	0	0	0	0	0	0	4	0	0	Rede Pública	201
29	2023-04-17 09:36:57.546	1	0	1	0	2	0	0	0	0	2	0	2	0	0	Rede Pública	202
30	2023-05-13 18:35:24.411	1	3	3	0	2	3	0	0	3	2	0	3	0	7	Rede Pública	111
31	2023-05-13 18:41:34.046	1	0	3	0	0	0	0	0	2	2	0	2	0	2	Rede Pública	113
32	2023-05-13 18:49:15.85	1	0	3	0	0	2	2	0	0	0	1	2	1	0	Rede Pública	113
33	2023-05-18 08:18:20.837	1	0	0	0	2	0	2	0	0	2	0	3	0	3	Rede Pública	203
34	2023-05-18 08:20:01.249	1	3	3	0	6	6	6	6	6	6	6	6	0	0	Rede Pública	114
35	2023-05-18 08:27:54.084	1	6	6	6	6	7	7	6	7	7	7	6	6	7	Rede Pública	204
36	2023-05-18 08:36:32.656	1	4	2	0	0	2	3	0	0	0	3	5	0	0	Rede Pública	205
37	2023-05-18 08:49:07.072	1	0	0	0	0	2	2	2	2	2	0	0	0	0	Rede Pública	115
38	2023-05-18 09:01:04.414	1	0	3	0	2	0	0	0	0	2	0	2	0	0	Rede Pública	155
39	2023-05-18 09:03:15.68	1	0	0	0	2	0	0	0	0	0	0	0	0	0	Rede Pública	116
40	2023-05-18 09:11:45.318	1	2	2	0	0	0	0	0	0	0	0	6	0	0	Rede Pública	117
41	2023-05-18 09:19:56.534	1	0	3	0	3	0	0	0	1	2	0	0	0	0	Rede Pública	118
42	2023-05-18 09:24:06.111	1	6	6	6	6	6	6	2	6	6	6	6	6	6	Rede Pública	206
43	2023-05-18 09:54:51.696	1	0	7	0	0	0	0	0	0	0	6	7	0	2	Rede Pública	119
44	2023-05-18 09:57:01.532	1	0	7	0	7	7	7	0	7	7	0	7	0	7	Rede Pública	210
45	2023-05-19 07:24:09.249	1	0	3	0	0	3	0	0	3	3	0	3	0	7	Rede Pública	120
46	2023-06-05 11:28:38.067	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	221
47	2023-06-06 19:42:31.156	1	1	1	0	1	1	7	0	0	1	1	1	1	0	Rede Pública	207
48	2023-06-06 19:44:32.729	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	208
49	2023-06-06 19:46:06.804	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	209
50	2023-06-06 19:47:35.733	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	212
51	2023-06-06 19:48:53.04	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	213
52	2023-06-06 19:51:34.862	1	0	4	0	4	7	2	0	0	0	0	0	0	0	Rede Pública	215
53	2023-06-06 19:53:08.414	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	216
54	2023-06-06 19:54:25.186	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	217
55	2023-06-06 19:55:28.537	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	218
56	2023-06-06 19:56:40.587	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	219
57	2023-06-06 19:57:47.411	1	0	0	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	220
58	2023-06-06 19:59:41.486	1	0	1	0	0	0	0	0	0	0	0	0	0	0	Rede Pública	222
59	2023-06-06 20:17:06.593	1	6	5	0	0	6	0	0	7	2	0	1	0	0	Rede Pública	211
60	2023-06-07 08:19:05.239	1	2	3	0	2	5	7	3	2	0	3	5	0	3	Rede Pública	223
61	2023-06-07 08:23:46.88	1	5	5	5	5	6	7	7	5	5	6	6	5	7	Rede Pública	224
62	2023-06-07 08:29:10.79	1	1	1	0	2	1	1	1	1	1	7	2	1	7	Rede Pública	225
63	2023-06-07 08:35:23.711	1	2	2	1	7	7	7	2	2	2	2	1	1	7	Rede Pública	226
64	2023-06-07 08:51:16.945	1	0	0	0	2	1	0	0	0	0	0	0	0	0	Rede Pública	227
65	2023-06-07 09:01:02.815	1	1	1	0	0	7	7	1	1	1	0	2	0	0	Rede Pública	228
66	2023-06-07 09:21:53.788	1	0	0	0	2	2	2	0	0	0	0	0	0	0	Rede Pública	229
67	2023-06-07 09:56:57.588	1	0	0	0	0	0	0	0	0	7	0	0	0	0	Rede Pública	229
68	2023-06-07 17:11:57.245	1	4	4	2	7	7	7	7	2	2	2	2	2	7	Rede Pública	230
69	2023-06-07 17:18:15.8	1	6	6	6	6	7	7	6	6	6	6	6	5	7	Rede Pública	231
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.users (id, email, password, role, name, "createdAt") FROM stdin;
1	admin@admin.com	$2b$10$M33q4wajazItZaczowRrx.20n.kV3n6KUWhjpUotmsxtFkkPVDvoa	ADMIN	João Pedro	2025-04-07 01:29:15.594
\.


--
-- Name: form_food_addiction_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.form_food_addiction_answers_id_seq', 77, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: form_food_addiction_answers form_food_addiction_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.form_food_addiction_answers
    ADD CONSTRAINT form_food_addiction_answers_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: form_food_addiction_answers form_food_addiction_answers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.form_food_addiction_answers
    ADD CONSTRAINT "form_food_addiction_answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

