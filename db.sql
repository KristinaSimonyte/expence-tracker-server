create table users (id bigint auto_increment primary key,
email VARCHAR(256) not null unique,
password text, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE income_outcome_groups (
id bigint auto_increment primary key,
user_id bigint not null,
type enum('INCOME', 'OUTCOME') NOT NULL DEFAULT('INCOME'),
group_title VARCHAR(256) not null unique, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT FK_group_userID FOREIGN KEY (user_id) REFERENCES users(id));
CREATE INDEX i_FK_group_userID on income_outcome_groups (user_id);

CREATE TABLE transactions (
id bigint auto_increment primary key,
user_id bigint not null,
group_id bigint not null,
transaction_date date not null ,
amount double not null,
comment text,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT FK_transaction_userID FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT FK_transaction_groupID FOREIGN KEY (group_id) REFERENCES income_outcome_groups(id));
CREATE INDEX i_FK_transaction_userID on transactions (user_id);
CREATE INDEX i_FK_transaction_groupID on transactions (group_id);