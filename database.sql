create user outgo@localhost;
create schema outgo;

use outgo;
grant all privileges on outgo.* to outgo@localhost;

create table user (
  id varchar(20) not null primary key,
  grade int not null,
  class int not null,
  passwd char(64) not null,
  salt char(8) not null,
  nickname char(4) not null, 
  num int not null,
  roomno int not null
);

create table outgo (
  id varchar(20) not null primary key,
  reason text not null
);
