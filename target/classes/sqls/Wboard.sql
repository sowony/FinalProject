
CREATE SEQUENCE wboard_seq

--시퀀스를 해당 위치에다가 넣어 두기 

CREATE TABLE wboard
(
	wbtodono NUMBER NOT NULL,
	wno NUMBER NOT NULL,
	dno NUMBER NOT NULL, --고유넘버(모든사람이 공통으로 가짐)
	dgno NUMBER NOT NULL, 
	wbtodo VARCHAR2(4), --Y : 한일 N : 해야 할 일 , 전체할일은 
	wbtitle VARCHAR2(1000),
	wbcontent VARCHAR2(1000),
	wfno_list VARCHAR2(1000),
	wbstartdate DATE NOT NULL,
	wbenddate DATE,
	wbcolor VARCHAR2(50),
	CONSTRAINT WBOARD_PK PRIMARY KEY(wbtodono)
)

INSERT INTO wboard VALUES
(wboard_seq.NEXTVAL,1,1,1,'N','할일제목','할일내용',NULL,SYSDATE,NULL,NULL)

SELECT * FROM WBOARD;
