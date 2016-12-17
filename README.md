# skyCalendar
angularJs版本的datetimepicker
#一：功能介绍
    1.支持年月日时分，暂不支持秒
    2.支持时间范围选择。
    3.暂时只支持"2016-12-13 10:30" 这一种日期格式
#二：参数设置
    maxDate: //要求是Date对象   日历选择的最大日期
    minDate: //要求是Date对象   日历选择的最小日期
    start:   //要求是Date对象   日历开始的选择的日期
    onChoose:null   //要求是function对象  日期选中后的回调函数，接受一个参数dates，dates是当前选中的日期
    showToday:true  //默认显示今天   是否显示今天
    showClear:true  //默认显示清除   是否显示清除
    showTime:true   //默认显示时间   是否显示时间
    isOPen:true     //默认开启    是否开启当点击日历之外的地方隐藏日历
#三：说明
    1.采用了bootstrap的样式，所以需要有bootstrap.css配合样式，样式也可以自己修改
#四：使用
    1.在你的module中引入sky.calendar.js.
    2.在html中引入日历指令
    	
    	<sky-calendar options="options"></sky-calendar>
    	
    3.第2条引号中的options就是你在控制器中设置的日历参数。
    	
    		$scope.options={
    			maxDate:new Date(),
    			minDate:new Date("2000-1-1 11:30"),
    			onChoose:function(dates){
    				alert(dates);
    			}
    		}
    	
    4.日历选中的日期是第2条的options.calendarValue
    	
    		$scope.options.calendarValue;
    	
#五：兼容性
    应该很差吧，我采用es6的拼接字符串方式。具体兼容性没有测试过。

#六：联系作者
    QQ:243585525