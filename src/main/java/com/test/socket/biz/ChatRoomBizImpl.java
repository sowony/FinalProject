package com.test.socket.biz;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.socket.dao.ChatRoomDao;
import com.test.socket.dto.ChatRoomDto;

@Service
@Transactional
public class ChatRoomBizImpl implements ChatRoomBiz {

	@Autowired
	private ChatRoomDao chatRoomDao;
	
	@Override
	public List<ChatRoomDto> selectList() {
		// TODO Auto-generated method stub
		return chatRoomDao.selectList();
	}

	@Override
	public ChatRoomDto selectOne(int roomid) {
		// TODO Auto-generated method stub
		return chatRoomDao.selectOne(roomid);
	}

	@Override
	public int insert(ChatRoomDto dto) {
		// TODO Auto-generated method stub
		return chatRoomDao.insert(dto);
	}

	@Override
	public int update(ChatRoomDto dto) {
		// TODO Auto-generated method stub
		return chatRoomDao.update(dto);
	}

	@Override
	public int delete(int roomid) {
		// TODO Auto-generated method stub
		return chatRoomDao.delete(roomid);
	}

}
