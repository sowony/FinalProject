package com.test.dashboard.model.biz;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.dashboard.model.dao.WboardDao;

@Service
@Transactional
public class WboardBizImpl implements WboardBiz{

	@Autowired
	private WboardDao wboardDao; 
	
	@Override
	public List<WboardDto> boardList(String mid) {
		// TODO Auto-generated method stub
		return null;
	}

}
