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
		return wboardDao.boardListAll(dgno);
	}

	@Override
	public List<WboardDto> boardList() {
		return wboardDao.boardList();
	}

	@Override
	public WboardDto wSelectOne(int wbtodono) {
		WboardDto wboardDto = null;
		
		try {
			wboardDto = wboardDao.wSelectOne(wbtodono);
		} catch (Exception e) {
			System.out.println("wboardDao biz 에러 발생");
			e.printStackTrace();
		}
		System.out.println(wbtodono);
		
		return wboardDao.wSelectOne(wbtodono);
	}

	//게시물 작성 
	@Override
	public int wbinsert(WboardDto dto) {
		
		return wboardDao.wbinsert(dto);
	}

}
