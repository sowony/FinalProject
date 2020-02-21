package com.test.socket.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.socket.dto.ChatRoomDto;

@Repository
public interface ChatRoomDao {

	@Select("select * from chatroom order by roomdate desc")
	List<ChatRoomDto> selectList();
	
	@Select("select * from chatroom where roomid = #{roomid}")
	ChatRoomDto selectOne(int roomid);
	
	@Insert("insert into chatroom values(#{roomid}, #{roomtitle}, sysdate")
	int insert(ChatRoomDto dto);

	@Update("update chatroom set roomtitle = #{roomtitle} where roomid = #{roomid}")
	int update(ChatRoomDto dto);
	
	@Delete("delete from chatroom where roomid = #{roomid}")
	int delete(int roomid);
	
	
}
