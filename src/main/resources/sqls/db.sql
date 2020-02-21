drop table chatroom;

create table chatroom(
	roomid number primary key,
	roomtitle varchar2(1000) not null,
	roomdate date
