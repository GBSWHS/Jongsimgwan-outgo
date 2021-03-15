create user outgo@localhost;
create schema outgo;

use outgo;
grant all privileges on outgo.* to outgo@localhost;

create table user (
  id varchar(20) not null primary key,
  grade int not null,
  class int not null,
  num int not null,
  roomno int not null,
  nickname char(4) not null, 
  passwd char(64) not null,
  salt char(8) not null,
  student int(1) not null default 1
);

create table outgo (
  id varchar(20) not null primary key,
  outgodate int(1) not null default 1,
  reason text not null,
  created_at timestamp default current_timestamp 
);
