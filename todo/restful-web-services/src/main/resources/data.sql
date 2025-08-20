INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');


INSERT INTO users (username, password) VALUES ('test','$2a$10$zraFH550Dt5sfcB9tFrf.urHGLlqA68wcy4Cgb2wvLdMaIbgz7cnG'); -- bcrypt of "password"
INSERT INTO users (username, password) VALUES ('user','$2a$10$mWvTzxCB1sjKCexzXQWXo.ExgK5ylnrYyy2QNFg/ngBBam5Hmgw5i'); -- bcrypt of "password"

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1); -- test has ROLE_USER
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2); -- test also has ROLE_ADMIN

INSERT INTO user_roles (user_id, role_id) VALUES (2, 1); -- user has ROLE_ADMIN


INSERT INTO TODO(id,IS_DONE,TARGET_DATE,DESCRIPTION,USERNAME)
VALUES(10001,FALSE,DATE'2025-10-01','Learn Spring Boot','test');

INSERT INTO TODO(id,IS_DONE,TARGET_DATE,DESCRIPTION,USERNAME)
VALUES(10002,TRUE,CURRENT_DATE,'Fullstack Course','test');

INSERT INTO TODO(id,IS_DONE,TARGET_DATE,DESCRIPTION,USERNAME)
VALUES(10003,TRUE,CURRENT_DATE,'JPA Course','test');

INSERT INTO TODO(id,IS_DONE,TARGET_DATE,DESCRIPTION,USERNAME)
VALUES(10004,TRUE,CURRENT_DATE,'Testing Course','user');
