package com.test.dashboard.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.dashboard.model.biz.WboardBiz;
import com.test.dashboard.model.dto.WboardDto;

@Controller
public class WboardController {

		private Logger logger = LoggerFactory.getLogger(WboardController.class);
		
		@Autowired
		private WboardBiz biz;
		
		@RequestMapping("/wboard")
		//나중에 int dgno를 추가해서  해당대시 보드에 들어가는 list를 뽑아내자 
		public String postWboard(Model model) {
			logger.info("[ INFO ] : wboardController > wlist");
			
			//System.out.println(dgno);
			
			model.addAttribute("list",biz.boardList());
			//model.addAttribute("list",biz.boardListAll(dgno));
			
			return "wboard";
		}
		
		
		@RequestMapping(value = "/wSelectOne", method = RequestMethod.POST)
		@ResponseBody
		//post방식으로 데이터를 주고 받을 경우 @ModelAttribute("받아오는 값 이름") 디비에서 이용되는 값이름  ,를 사용해서 이름을 맞춰주어야 에러가 안뜬다  
		public Map<String, Object> selectOne(@ModelAttribute("selectno") int wbtodono) {
			System.out.println("으아아앙ㄱ " + wbtodono);
			
			//글 상세보기 
			//wwdto.getWbtodono()
			
			WboardDto dto = biz.wSelectOne(wbtodono);
			System.out.println("디티오 ㅂ부ㅜㄴ"+dto.getMid()+dto.getWbtitle()+dto.getWbstartdate());
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("wbtodono",dto.getWbtodono());
			map.put("wno",dto.getWno());
			map.put("dno",dto.getDno());
			map.put("dgno",dto.getDgno());
			map.put("mid",dto.getMid());
			map.put("wbtodo",dto.getWbtodo());
			map.put("wbtitle",dto.getWbtitle());
			map.put("wbcontent",dto.getWbcontent());
			map.put("wfno_list", dto.getWfno_list());
			map.put("wbstartdate", dto.getWbstartdate());
			map.put("wbenddate", dto.getWbenddate());
			map.put("wbcolor", dto.getWbcolor());
		    

			return map;
		
		}
		
		@GetMapping("/summerwrite")
		public String boardWrite() {
		  return "summerboardwrite";
		}
		
		@PostMapping("/summerwrite")
		public String wbinsert(WboardDto dto) {
			
			int	res = biz.wbinsert(dto);
			if(res > 0) {
				System.out.println("저장완료");
				return "redirect:wboard";
				
			}else {
				System.out.println("저장안됨");
				return "summerboardwrite";
			}
			
		
		}
		
		

		
}
