
CREATE SEQUENCE wboard_seq

--시퀀스를 해당 위치에다가 넣어 두기 

CREATE TABLE wboard
(
	wbtodono NUMBER NOT NULL, --위젯보드 해야할일 전체 번호
	wno NUMBER NOT NULL, --위젯번호
	dno NUMBER NOT NULL, --고유넘버(모든사람이 공통으로 가짐),위젯이 속한 대시보드 테이블 번호 
	dgno NUMBER NOT NULL, --대시보드 맴버 권한 그룹 넘버 
	wbtodo VARCHAR2(4), --Y : 한일 N : 해야 할 일 , 전체할일은 
	wbtitle VARCHAR2(1000), 
	wbcontent VARCHAR2(1000),
	wfno_list VARCHAR2(1000), --파일 테이블 번호 
	wbstartdate DATE NOT NULL,
	wbenddate DATE,
	wbcolor VARCHAR2(50), -- 하일 게시판 색상 
	CONSTRAINT WBOARD_PK PRIMARY KEY(wbtodono)
)

INSERT INTO wboard VALUES
(wboard_seq.NEXTVAL,1,1,1,'N','할일제목','할일내용',NULL,SYSDATE,NULL,NULL)
INSERT INTO wboard VALUES
(wboard_seq.NEXTVAL,1,1,2,'N','할일제목','할일내용',NULL,SYSDATE,NULL,NULL)
INSERT INTO wboard VALUES
(wboard_seq.NEXTVAL,1,1,3,'N','할일제목','할일내용',NULL,SYSDATE,NULL,NULL)
INSERT INTO wboard VALUES
(wboard_seq.NEXTVAL,2,1,1,'N','할일제목','할일내용',NULL,SYSDATE,NULL,NULL)


SELECT * FROM WBOARD;
