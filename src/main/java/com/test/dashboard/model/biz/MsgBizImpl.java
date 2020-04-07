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
	@Autowired private MemberBiz memberbiz;

	@Override
	public List<Map<Object, Object>> selectAll(String mid) {
		// TODO Auto-generated method stub
		return msgdao.selectAll(mid);
	}

	@Override
	public List<MsgDto> selectList(String mid, int dno) {
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
		
		MsgDto dto = msgdao.getMsg(msgno);
		dto.setMsgtonick(memberbiz.selectById(dto.getMsgto()).getMnick());
		dto.setMsgfromnick(memberbiz.selectById(dto.getMsgfrom()).getMnick());
		
		return dto;
	}

	@Override
	public int sendMsg(MsgDto dto) {
		// TODO Auto-generated method stub
		
		dto.setMsgtonick(memberbiz.selectById(dto.getMsgto()).getMnick());
		dto.setMsgfromnick(memberbiz.selectById(dto.getMsgfrom()).getMnick());
		
		return msgdao.sendMsg(dto);
	}

}
