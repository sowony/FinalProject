package com.test.dashboard.model.biz;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.dashboard.model.dao.WboardDao;
import com.test.dashboard.model.dto.WboardDto;

@Service
@Transactional
public class WboardBizImpl implements WboardBiz{

	@Autowired
	private WboardDao wboardDao; 
	
	@Override
	public List<WboardDto> boardListAll(int dgno) {
		// TODO Auto-generated method stub
		return wboardDao.boardListAll(dgno);
	}

	@Override
	public List<WboardDto> boardList() {
		// TODO Auto-generated method stub
		return wboardDao.boardList();
	}

}
