package com.test.dashboard.model.biz;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.dashboard.model.dao.MsgDao;
import com.test.dashboard.model.dto.MsgDto;

@Service
public class MsgBizImpl implements MsgBiz {
	
	@Autowired private MsgDao msgdao;

	@Override
	public List<Map<Object, Object>> selectAll(String mid) {
		// TODO Auto-generated method stub
		return msgdao.selectAll(mid);
	}

	@Override
	public List<MsgDto> selectList(String mid, String dno) {
		// TODO Auto-generated method stub
		Map<Object, Object> params = new HashedMap();
		params.put("mid", mid);
		params.put("dno", dno);
		
		return msgdao.selectList(params);
	}

	@Override
	public List<MsgDto> selectListAll(String mid) {
		// TODO Auto-generated method stub
		return msgdao.selectListAll(mid);
	}

	@Override
	public void setOpened(String msgno) {
		// TODO Auto-generated method stub
		msgdao.setOpened(msgno);
		
	}

	@Override
	public MsgDto getMsg(String msgno) {
		// TODO Auto-generated method stub
		return msgdao.getMsg(msgno);
	}

	@Override
	public int sendMsg(MsgDto dto) {
		// TODO Auto-generated method stub
		Map<Object, Object> params = new HashedMap();
		params.put("msgtitle",dto.getMsgtitle());
		params.put("msgcontent",dto.getMsgcontent());
		params.put("msgfrom",dto.getMsgfrom());
		params.put("msgto",dto.getMsgto());
		params.put("dno", dto.getDno());
		params.put("msgdate",dto.getMsgdate());
		return msgdao.sendMsg(params);
	}

	@Override
	public List<String> getDashMember(String dno) {
		// TODO Auto-generated method stub
		return msgdao.getDashMember(dno);
	}


}
