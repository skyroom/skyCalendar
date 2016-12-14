/**
 * Created by mycity on 2016/12/13.
 */
angular.module('sky.calendar', ['ng']).directive('skyCalendar', [function() {
    return {
        restrict: 'AE',
        scope: {
            options: "="
        },
        replace: true,
        template: //
    `<div class="sky_calendar_con" ng-class="{'sky_calendar_con_isShow':sobj.calendar.showSkyCalendar.canShow}">
        <input type="text" ng-model="options.calendarValue" ng-blur="sobj.calendar.inputBlur($event)" ng-focus="sobj.calendar.inputFocus()" ng-click="sobj.calendar.inputClick($event)"/>
        <div class="sky_calendar" ng-show="sobj.calendar.showSkyCalendar.canShow" ng-click="sobj.calendar.hideAllPanel()" ng-mouseup="sobj.calendar.calendarMouseup()" ng-mousedown="sobj.calendar.calendarMousedown()">
            <table>
                <thead>
                    <tr>
                        <th class="text-center">
                            <button type="button" class="btn btn-default btn-sm" tabindex="-1" ng-click="sobj.calendar.showDateTbody({year:sobj.calendar.displayDate.year-1,month:sobj.calendar.displayDate.month,date:sobj.calendar.displayDate.date,hour:sobj.calendar.displayDate.hour,minute:sobj.calendar.displayDate.minute})" ng-disabled="sobj.calendar.canDisabledPrevYear">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                            </button>
                        </th>
                        <th colspan="2" class="text-center display-year">
                            <button type="button" class="btn btn-default btn-sm" tabindex="-1" style="width:100%;" ng-click="sobj.calendar.showYearPanel($event,sobj.calendar.displayDate.year)">
                                <strong ng-bind="sobj.calendar.displayDate.year"></strong>
                                <strong>年</strong>
                            </button>
                            <div class="display-year-table" ng-show="sobj.calendar.panel.yearPanel" ng-click="sobj.calendar.stopBubble($event)">
                                <table>
                                    <thead>
                                        <tr>
                                            <th colspan="3" class="text-center">
                                                <button ng-disabled="sobj.calendar.canDisabledPrevYearPanel" type="button" class="btn btn-default btn-sm" tabindex="-1" style="width:100%;" ng-click="sobj.calendar.showPrevOrNextYearPanel(-1)">
                                                    <span class="glyphicon glyphicon-chevron-up"></span>
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="yearRows in sobj.calendar.yearTbodyArray">
                                            <td class="text-center" ng-repeat="yearCols in yearRows track by $index">  
                                                <button type="button" style="width:100%;" class="btn btn-sm" ng-class="{'btn-default':yearCols!=sobj.calendar.displayDate.year,'btn-info':yearCols==sobj.calendar.displayDate.year}"
                                                ng-disabled="yearCols>sobj.calendar.options.maxDate.year||yearCols<sobj.calendar.options.minDate.year" ng-click="sobj.calendar.selectYear({year:yearCols,month:sobj.calendar.displayDate.month})">
                                                    <span ng-bind="yearCols"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="3" class="text-center">
                                                <button ng-disabled="sobj.calendar.canDisabledNextYearPanel" type="button" class="btn btn-default btn-sm" tabindex="-1" style="width:100%;" ng-click="sobj.calendar.showPrevOrNextYearPanel(1)">
                                                    <span class="glyphicon glyphicon-chevron-down"></span>
                                                </button>
                                            </th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </th>
                        <th class="text-center">
                            <button type="button" class="btn btn-default btn-sm" tabindex="-1" ng-click="sobj.calendar.showDateTbody({year:sobj.calendar.displayDate.year+1,month:sobj.calendar.displayDate.month,date:sobj.calendar.displayDate.date,hour:sobj.calendar.displayDate.hour,minute:sobj.calendar.displayDate.minute})" ng-disabled="sobj.calendar.canDisabledNextYear">
                                <i class="glyphicon glyphicon-chevron-right"></i>
                            </button>
                        </th>
                        
                        <th class="text-center">
                            <button type="button" class="btn btn-default btn-sm" tabindex="-1" ng-click="sobj.calendar.showDateTbody({year:sobj.calendar.displayDate.year,month:sobj.calendar.displayDate.month-1,date:sobj.calendar.displayDate.date,hour:sobj.calendar.displayDate.hour,minute:sobj.calendar.displayDate.minute})" ng-disabled="sobj.calendar.canDisabledPrevMonth">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                            </button>
                        </th>
                        <th class="text-center display-month">
                            <button type="button" class="btn btn-default btn-sm display-month" tabindex="-1" style="width:100%;" ng-click="sobj.calendar.showMonthPanel($event,sobj.calendar.displayDate)">
                                <strong ng-bind="sobj.calendar.displayDate.month"></strong>
                                <strong>月</strong>
                            </button>
                            <div class="display-month-table" ng-click="sobj.calendar.stopBubble($event)" ng-show="sobj.calendar.panel.monthPanel">
                                <table>
                                    <tbody>
                                        <tr ng-repeat="monthRows in sobj.calendar.monthTbodyArray">
                                            <td class="text-center" ng-repeat="monthCols in monthRows track by $index">  
                                                <button type="button" style="width:100%;" class="btn btn-sm" ng-class="{'btn-default':monthCols.month!=sobj.calendar.displayDate.month,'btn-info':monthCols.month==sobj.calendar.displayDate.month}"
                                                ng-disabled="(monthCols.year==sobj.calendar.options.maxDate.year&&monthCols.month>sobj.calendar.options.maxDate.month)||(monthCols.year==sobj.calendar.options.minDate.year&&monthCols.month<sobj.calendar.options.minDate.month)" ng-click="sobj.calendar.selectMonth({year:monthCols.year,month:monthCols.month})">
                                                    <span ng-bind="monthCols.month"></span><span>月</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </th>
                        <th class="text-center">
                            <button type="button" class="btn btn-default btn-sm" tabindex="-1" ng-click="sobj.calendar.showDateTbody({year:sobj.calendar.displayDate.year,month:sobj.calendar.displayDate.month+1,date:sobj.calendar.displayDate.date,hour:sobj.calendar.displayDate.hour,minute:sobj.calendar.displayDate.minute})" ng-disabled="sobj.calendar.canDisabledNextMonth">
                                <i class="glyphicon glyphicon-chevron-right"></i>
                            </button>
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center"><small aria-label="星期六" class="ng-binding">周日</small>
                        </th>
                        <th  class="text-center"><small aria-label="星期六" class="ng-binding">周一</small>
                        </th>
                        <th  class="text-center"><small aria-label="星期六" class="ng-binding">周二</small>
                        </th>
                        <th class="text-center"><small aria-label="星期六" class="ng-binding">周三</small>
                        </th>
                        <th  class="text-center"><small aria-label="星期六" class="ng-binding">周四</small>
                        </th>
                        <th  class="text-center"><small aria-label="星期六" class="ng-binding">周五</small>
                        </th>
                        <th class="text-center"><small aria-label="星期六" class="ng-binding">周六</small>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="dateRows in sobj.calendar.dateTbodyArray">
                        <td class="text-center" ng-repeat="dateCols in dateRows track by $index">  <!---->
                            <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{'btn-default':!dateCols.current,'btn-info':dateCols.current}" ng-click="sobj.calendar.selectDate(dateCols)" ng-disabled="dateCols.year==sobj.calendar.options.maxDate.year&&dateCols.month==sobj.calendar.options.maxDate.month&&dateCols.date>sobj.calendar.options.maxDate.date||dateCols.year==sobj.calendar.options.minDate.year&&dateCols.month==sobj.calendar.options.minDate.month&&dateCols.date<sobj.calendar.options.minDate.date||dateCols.year==sobj.calendar.options.maxDate.year&&dateCols.month>sobj.calendar.options.maxDate.month||dateCols.year==sobj.calendar.options.minDate.year&&dateCols.month<sobj.calendar.options.minDate.month||dateCols.year<sobj.calendar.options.minDate.year||dateCols.year>sobj.calendar.options.maxDate.year">
                                <span ng-bind="dateCols.date" ng-class="{'text-muted':dateCols.month!=sobj.calendar.displayDate.month}"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="7">
                            <div class="btn-group sky_calendar_time_btn" role="group" ng-show="sobj.calendar.options.showTime">
                                <span>时间</span>
                                <span>:</span>
                                <button type="button" class="btn btn-default" ng-click="sobj.calendar.showHourPanel($event,sobj.calendar.displayDate)" ng-bind="sobj.calendar.displayDate.hour"></button>
                                <button type="button" class="btn btn-default" ng-bind="sobj.calendar.displayDate.minute" ng-click="sobj.calendar.showMinutePanel($event,sobj.calendar.displayDate)"></button>
                                <div class="display-hour-table" ng-show="sobj.calendar.panel.hourPanel" ng-click="sobj.calendar.stopBubble($event)">
                                    <div class="text-center">
                                        小时
                                        <span class="pull-right" ng-click="sobj.calendar.panel.hourPanel=!sobj.calendar.panel.hourPanel">&times;</span>
                                    </div>
                                    <div>
                                        <table>
                                        <tbody>
                                            <tr ng-repeat="hourRows in sobj.calendar.hourTbodyArray">
                                                <td class="text-center" ng-repeat="hourCols in hourRows">  
                                                    <button type="button" style="width:100%;" class="btn btn-sm" ng-class="{'btn-default':!(hourCols.hour==sobj.calendar.displayDate.hour),'btn-info':hourCols.hour==sobj.calendar.displayDate.hour}" ng-disabled="sobj.calendar.isHourDisabled(hourCols)" ng-click="sobj.calendar.selectHour(hourCols)">
                                                        <span ng-bind="hourCols.hour"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div class="display-minute-table" ng-show="sobj.calendar.panel.minutePanel" ng-click="sobj.calendar.stopBubble($event)">
                                    <div class="text-center">
                                        分钟
                                        <span class="pull-right" ng-click="sobj.calendar.panel.minutePanel=!sobj.calendar.panel.minutePanel">&times;</span>
                                    </div>
                                    <div>
                                        <table>
                                        <tbody>
                                            <tr ng-repeat="minuteRows in sobj.calendar.minuteTbodyArray">
                                                <td class="text-center" ng-repeat="minuteCols in minuteRows">  
                                                    <button type="button" style="width:100%;" class="btn btn-sm" ng-class="{'btn-default':!(minuteCols.minute==sobj.calendar.displayDate.minute),'btn-info':minuteCols.minute==sobj.calendar.displayDate.minute}" ng-disabled="sobj.calendar.isMinuteDisabled(minuteCols)" ng-click="sobj.calendar.selectMinute(minuteCols)">
                                                        <span ng-bind="minuteCols.minute"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                            <div class="pull-right">
                                <button type="button" class="btn btn-sm btn-success pull-right" ng-click="sobj.calendar.showSkyCalendar.canShow=false">关闭</button>
                                <button type="button" class="btn btn-sm btn-info pull-right" ng-show="sobj.calendar.options.showToday" ng-click="sobj.calendar.showToday()">今天</button>
                                <button type="button" class="btn btn-sm btn-warning pull-right" ng-show="sobj.calendar.options.showClear" ng-click="sobj.calendar.clearInput()">清除</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>`,
        link: function(scope, elem, attrs) {
            var sobj = scope.sobj = {};

            sobj.calendar = {
                attributes: { //保存一些必要的属性
                    weekValue: [""]
                },
                dateTbodyArray: [], //日  显示的数组
                monthTbodyArray: [], //月  显示的数组
                yearTbodyArray: [], //年  显示的数组
                hourTbodyArray: [], //时  显示的数组
                minuteTbodyArray: [], //分  显示的数组
                displayDate: { //插件展示的日期，可能没有日时分，只有年月
                    year: null,
                    month: null,
                    date: null,
                    hour:null,
                    minute:null
                },
                panel: {
                    yearPanel: false,
                    monthPanel: false,
                    hourPanel: false,
                    minutePanel: false
                },
                canDisabledPrevYearPanel: false, //能否禁用上一年面板的按钮
                canDisabledNextYearPanel: false, //能否禁用下一年面板的按钮
                canDisabledPrevYear: false, //能否禁用上一年按钮
                canDisabledNextYear: false, //能否禁用下一年按钮
                canDisabledPrevMonth: false, //能否禁用上一月按钮
                canDisabledNextMonth: false, //能否禁用下一月按钮
                options: {
                    maxDate: { //要求是Date对象
                        year: null,
                        month: null,
                        date: null,
                        hour:null,
                        minute:null
                    },
                    minDate: { //要求是Date对象
                        year: null,
                        month: null,
                        date: null,
                        hour:null,
                        minute:null
                    },
                    start: { //开始日期  要求是Date对象
                        year: null,
                        month: null,
                        date: null,
                        hour:null,
                        minute:null
                    },
                    onChoose:null ,//要求是function对象
                    showToday:true, //默认显示今天
                    showClear:true,//默认显示清除
                    showTime:true, //默认显示时间
                    isOpen:true //默认开启    是否开启点击日历之外的地方将日历隐藏
                },
                showSkyCalendar:{
                    canShow:false
                },
                run: function(options) {
                    var me = this;
                    //是否有最大日期
                    if (options && options.maxDate !== undefined) {
                        me.options.maxDate.year = options.maxDate.getFullYear();
                        me.options.maxDate.month = options.maxDate.getMonth() + 1;
                        me.options.maxDate.date = options.maxDate.getDate();
                        me.options.maxDate.hour = options.maxDate.getHours();
                        me.options.maxDate.minute = options.maxDate.getMinutes();
                    } else {
                        me.options.maxDate.year = 2099;
                        me.options.maxDate.month = 12;
                        me.options.maxDate.date = 31;
                        me.options.maxDate.hour = 0;
                        me.options.maxDate.minute = 0;
                    }

                    //是否有最小日期
                    if (options && options.minDate !== undefined) {
                        me.options.minDate.year = options.minDate.getFullYear();
                        me.options.minDate.month = options.minDate.getMonth() + 1;
                        me.options.minDate.date = options.minDate.getDate();
                        me.options.minDate.hour = options.minDate.getHours();
                        me.options.minDate.minute = options.minDate.getMinutes();
                    } else {
                        me.options.minDate.year = 1900;
                        me.options.minDate.month = 1;
                        me.options.minDate.date = 1;
                        me.options.minDate.hour = 0;
                        me.options.minDate.minute = 0;
                    }


                    //是否显示时间
                    if (options && options.showTime !== undefined) {
                        me.options.showTime = options.showTime;
                    }

                    //是否显示清除
                    if (options && options.showClear !== undefined) {
                        me.options.showClear = options.showClear;
                    }

                    //是否有onChoose函数
                    if (options && options.onChoose !== undefined) {
                        me.options.onChoose=options.onChoose;
                    }

                    //是否开始隐藏功能
                    if (options && options.isOpen !== undefined) {
                        me.options.isOpen=options.isOpen;
                    }

                    //是否有开始日期
                    if (options && options.start !== undefined) {
                        me.options.start.year = options.start.getFullYear();
                        me.options.start.month = options.start.getMonth() + 1;
                        me.options.start.date = options.start.getDate();
                        me.options.start.hour = options.start.getHours();
                        me.options.start.minute = options.start.getMinutes();
                    } else {
                        //如果最大日期小于当前日期则显示最大日期，暂时不考虑开始日期的bug
                        if (options && options.maxDate && options.maxDate.getTime() < new Date().getTime())
                        {
                            me.options.start.year = options.maxDate.getFullYear();
                            me.options.start.month = options.maxDate.getMonth() + 1;
                            me.options.start.date = options.maxDate.getDate();
                            me.options.start.hour = options.maxDate.getHours();
                            me.options.start.minute = options.maxDate.getMinutes();
                        } 
                        else 
                        {
                            me.options.start.year = new Date().getFullYear();
                            me.options.start.month = new Date().getMonth() + 1;
                            me.options.start.date = new Date().getDate();
                            me.options.start.hour = new Date().getHours();
                            me.options.start.minute = new Date().getMinutes();
                        }
                    }


                    //是否显示今天
                    if (options && options.showToday !== undefined) {
                        me.options.showToday = options.showToday;
                    }
                    if(new Date().getTime()>new Date(me.options.maxDate.year,me.options.maxDate.month,me.options.maxDate.date,me.options.maxDate.hour,me.options.maxDate.minute).getTime()){
                        me.options.showToday=false;
                    }
                    if(new Date().getTime()<new Date(me.options.minDate.year,me.options.minDate.month,me.options.minDate.date,me.options.minDate.hour,me.options.minDate.minute).getTime()){
                        me.options.showToday=false;
                    }


                    //需要显示的日期
                    me.displayDate.year = me.options.start.year;
                    me.displayDate.month = me.options.start.month;
                    me.displayDate.date = me.options.start.date;
                    me.displayDate.hour = me.timeFormat(me.options.start.hour);
                    me.displayDate.minute = me.timeFormat(me.options.start.minute);
                    me.showDateTbody(me.displayDate);

                },
                showDateTbody: function(obj) { //这里先将date中的数据放入一个一维数组，再转化成二维数组
                    var me = this;
                    //console.log(obj);

                    //处理时间参数obj
                    if (obj.month > 12) {
                        obj.month = 1;
                        obj.year++;
                    }
                    if (obj.month < 1) {
                        obj.month = 12;
                        obj.year--;
                    }


                    //判断时间参数obj是否超过范围
                    if(new Date(obj.year,obj.month,obj.date,obj.hour,obj.minute).getTime()>new Date(me.options.maxDate.year,me.options.maxDate.month,me.options.maxDate.date,me.options.maxDate.hour,me.options.maxDate.minute).getTime()){
                        obj.year=me.options.maxDate.year;
                        obj.month=me.options.maxDate.month;
                        obj.date=me.options.maxDate.date;
                        obj.hour=me.options.maxDate.hour;
                        obj.minute=me.options.maxDate.minute;
                    }
                    if(new Date(obj.year,obj.month,obj.date,obj.hour,obj.minute).getTime()<new Date(me.options.minDate.year,me.options.minDate.month,me.options.minDate.date,me.options.minDate.hour,me.options.minDate.minute).getTime()){
                        obj.year=me.options.minDate.year;
                        obj.month=me.options.minDate.month;
                        obj.date=me.options.minDate.date;
                        obj.hour=me.options.minDate.hour;
                        obj.minute=me.options.minDate.minute;
                    }


                    //要显示的年月日时分
                    me.displayDate.year = obj.year;
                    me.displayDate.month = obj.month;
                    me.displayDate.date = obj.date;
                    me.displayDate.hour = me.timeFormat(obj.hour);
                    me.displayDate.minute = me.timeFormat(obj.minute);

                    var tempTbodyArray = []; //临时数组，保存42个日期

                    //上一个月的数据
                    var tempPrevData = {
                        year: 0,
                        month: 0,
                        data: []
                    };
                    if (obj.month == 1) {
                        tempPrevData.month = 12;
                        tempPrevData.year = obj.year - 1;
                    } else {
                        tempPrevData.month = obj.month - 1;
                        tempPrevData.year = obj.year;
                    }
                    var tempDatePrev = me.getDaysByMonth(tempPrevData.year, tempPrevData.month); //初始化的月份上个月有多少天
                    var tempWeek = new Date(obj.year, obj.month - 1, 1).getDay(); //得到要显示年月的1号是星期几
                    for (var i = tempWeek - 1; i >= 0; i--) {
                        tempTbodyArray.push({
                            year: tempPrevData.year,
                            month: tempPrevData.month,
                            date: tempDatePrev - i
                        });
                    }

                    //要显示月的数据
                    var tempDate = me.getDaysByMonth(obj.year, obj.month); //要显示月有多少天
                    for (var i = 1; i <= tempDate; i++) {
                        if (obj.date == i) {
                            tempTbodyArray.push({
                                year: obj.year,
                                month: obj.month,
                                date: i,
                                current: true
                            });
                        } else {
                            tempTbodyArray.push({
                                year: obj.year,
                                month: obj.month,
                                date: i
                            });
                        }
                    }


                    //下一个月的数据
                    var tempNextData = {
                        year: 0,
                        month: 0,
                        data: []
                    };
                    if (obj.month == 12) {
                        tempNextData.month = 1;
                        tempNextData.year = obj.year + 1;
                    } else {
                        tempNextData.month = obj.month + 1;
                        tempNextData.year = obj.year;
                    }
                    var tempLenth = tempTbodyArray.length;
                    for (var i = 1; i <= 42 - tempLenth; i++) {
                        tempTbodyArray.push({
                            year: tempNextData.year,
                            month: tempNextData.month,
                            date: i
                        });
                    }

                    //赋值 dateTbodyArray
                    me.dateTbodyArray = [];
                    for (var i = 0; i < 6; i++) {
                        me.dateTbodyArray.push(tempTbodyArray.slice(i * 7, i * 7 + 7));
                    }
                    //console.log(me.dateTbodyArray);

                    //判断是否可以禁用上一年或者下一年
                    me.canDisabledPrevYear = false;
                    me.canDisabledNextYear = false;
                    if (me.displayDate.year == me.options.maxDate.year) {
                        me.canDisabledNextYear = true;
                    }
                    if (me.displayDate.year == me.options.minDate.year) {
                        me.canDisabledPrevYear = true;
                    }

                    //判断是否可以禁用上一月或者下一月
                    me.canDisabledPrevMonth = false;
                    me.canDisabledNextMonth = false;
                    if (me.displayDate.year == me.options.maxDate.year && me.displayDate.month == me.options.maxDate.month) {
                        me.canDisabledNextMonth = true;
                    }
                    if (me.displayDate.year == me.options.minDate.year && me.displayDate.month == me.options.minDate.month) {
                        me.canDisabledPrevMonth = true;
                    }
                },
                getDaysByMonth: function(year, month) { //得到某月有多少天
                    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        return 31;
                    } else if (month == 2) {
                        if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
                            return 29;
                        } else {
                            return 28;
                        }
                    } else {
                        return 30;
                    }
                },
                selectYear: function(obj) { //选中年
                    var me = this;
                    me.hideAllPanel();
                    me.displayDate.year=obj.year;
                    me.showDateTbody(me.displayDate);
                },
                selectMonth: function(obj) { //选中月
                    var me = this;
                    me.hideAllPanel();
                    me.displayDate.month=obj.month;
                    me.showDateTbody(me.displayDate);
                },
                selectDate: function(obj) { //选中日
                    var me = this;

                    obj.hour=me.displayDate.hour;
                    obj.minute=me.displayDate.minute;

                    me.showDateTbody(obj);
                    me.showTimeFormat(obj);
                    if(me.options.onChoose){
                        me.options.onChoose(scope.options.calendarValue);
                    }
                },
                selectHour:function(obj){
                    var me=this;
                    obj.hour=me.timeFormat(obj.hour);
                    me.panel.hourPanel=false;

                    me.displayDate.hour=obj.hour;

                    //判断选中小时之后是否分钟超过范围
                    if(new Date(me.displayDate.year,me.displayDate.month,me.displayDate.date,me.displayDate.hour,me.displayDate.minute).getTime()>new Date(me.options.maxDate.year,me.options.maxDate.month,me.options.maxDate.date,me.options.maxDate.hour,me.options.maxDate.minute).getTime()){
                        me.displayDate.year=me.options.maxDate.year;
                        me.displayDate.month=me.options.maxDate.month;
                        me.displayDate.date=me.options.maxDate.date;
                        me.displayDate.hour=me.timeFormat(me.options.maxDate.hour);
                        me.displayDate.minute=me.timeFormat(me.options.maxDate.minute);
                    }
                    if(new Date(me.displayDate.year,me.displayDate.month,me.displayDate.date,me.displayDate.hour,me.displayDate.minute).getTime()<new Date(me.options.minDate.year,me.options.minDate.month,me.options.minDate.date,me.options.minDate.hour,me.options.minDate.minute).getTime()){
                        me.displayDate.year=me.options.minDate.year;
                        me.displayDate.month=me.options.minDate.month;
                        me.displayDate.date=me.options.minDate.date;
                        me.displayDate.hour=me.timeFormat(me.options.minDate.hour);
                        me.displayDate.minute=me.timeFormat(me.options.minDate.minute);
                    }

                    me.showTimeFormat(me.displayDate);
                    if(me.options.onChoose){
                        me.options.onChoose(scope.options.calendarValue);
                    }
                },
                selectMinute:function(obj){
                    var me=this;

                    obj.minute=me.timeFormat(obj.minute);

                    me.panel.minutePanel=false;

                    me.displayDate.minute=obj.minute;

                    me.showTimeFormat(me.displayDate);

                    if(me.options.onChoose){
                        me.options.onChoose(scope.options.calendarValue);
                    }
                },
                showYearPanel: function($event, year) { //显示年的弹出框
                    var me = this;
                    $event.stopPropagation();
                    me.hideAllPanel();
                    me.panel.yearPanel = true;
                    me.yearTbodyArray = [];

                    me.canDisabledPrevYearPanel = false;
                    me.canDisabledNextYearPanel = false;

                    //先得到九个长度的一维数组
                    var temp = [];
                    for (var i = -4; i < 5; i++) {
                        temp.push(year + i);
                    }

                    //再得到二维数组
                    for (var i = 0; i < 3; i++) {
                        me.yearTbodyArray.push(temp.slice(i * 3, i * 3 + 3));
                    }

                    me.canDisabledPrevYearPanel = false;
                    me.canDisabledNextYearPanel = false;
                    if (me.yearTbodyArray[0][0] < me.options.minDate.year) {
                        me.canDisabledPrevYearPanel = true;
                    }
                    if (me.yearTbodyArray[2][2] > me.options.maxDate.year) {
                        me.canDisabledNextYearPanel = true;
                    }
                },
                showPrevOrNextYearPanel: function(bit) {
                    var me = this;
                    for (var i = 0; i < 3; i++) {
                        for (var j = 0; j < 3; j++) {
                            if (bit == 1) {
                                me.yearTbodyArray[i][j] += 9;
                            } else {
                                me.yearTbodyArray[i][j] -= 9;
                            }
                        }
                    }
                    me.canDisabledPrevYearPanel = false;
                    me.canDisabledNextYearPanel = false;
                    if (me.yearTbodyArray[0][0] < me.options.minDate.year) {
                        me.canDisabledPrevYearPanel = true;
                    }
                    if (me.yearTbodyArray[2][2] > me.options.maxDate.year) {
                        me.canDisabledNextYearPanel = true;
                    }
                },
                showMonthPanel: function($event, obj) { //显示月的弹出框  接受时间格式的obj参数 
                    var me = this;

                    $event.stopPropagation();
                    me.hideAllPanel();
                    me.panel.monthPanel = true;

                    me.monthTbodyArray = [];

                    var temp = 1;
                    //创建一维数组
                    var tempArray = [];
                    for (var i = 0; i < 6; i++) {
                        for (var j = 0; j < 2; j++) {
                            tempArray.push({
                                year: obj.year,
                                month: temp++
                            })
                        }
                    }

                    //得到二维数组
                    for (var i = 0; i < 6; i++) {
                        me.monthTbodyArray.push(tempArray.slice(i * 2, i * 2 + 2));
                    }
                },
                showHourPanel:function($event,obj){ //显示小时的弹出框  接受时间格式的obj参数:年月日
                    var me=this;
                    
                    $event.stopPropagation();
                    me.hideAllPanel();
                    me.panel.hourPanel = true;

                    me.hourTbodyArray = [];

                    var temp = 0;
                    //创建一维数组
                    var tempArray = [];
                    for (var i = 0; i < 6; i++) {
                        for (var j = 0; j < 4; j++) {
                            tempArray.push({
                                year: obj.year,
                                month: obj.month,
                                date:obj.date,
                                hour:temp++
                            })
                        }
                    }

                    //得到二维数组
                    for (var i = 0; i < 6; i++) {
                        me.hourTbodyArray.push(tempArray.slice(i * 4, i * 4 + 4));
                    }
                },
                showMinutePanel:function($event,obj){ //显示分钟的弹出框  接受时间格式的obj参数:年月日时
                    var me=this;

                    $event.stopPropagation();
                    me.hideAllPanel();
                    me.panel.minutePanel = true;

                    me.minuteTbodyArray = [];

                    var temp = 0;
                    //创建一维数组
                    var tempArray = [];
                    for (var i = 0; i < 6; i++) {
                        for (var j = 0; j < 10; j++) {
                            tempArray.push({
                                year: obj.year,
                                month: obj.month,
                                date:obj.date,
                                hour:obj.hour,
                                minute:temp++
                            })
                        }
                    }

                    //得到二维数组
                    for (var i = 0; i < 6; i++) {
                        me.minuteTbodyArray.push(tempArray.slice(i * 10, i * 10 + 10));
                    }
                },
                hideAllPanel: function() { //关闭所有的面板
                    var me = this;
                    for (var key in me.panel) {
                        me.panel[key] = false;
                    }
                },
                stopBubble: function($event) { //阻止冒泡
                    $event.stopPropagation();
                },
                timeFormat:function(numberParam){
                    if(String(numberParam).length<2){
                        return String("0"+numberParam);
                    }else {
                        return String(numberParam);
                    }
                },
                showTimeFormat:function(obj){   //格式化选中的时间并且显示在输入框中
                    var me=this;

                    if(me.options.showTime){
                        scope.options.calendarValue=obj.year+"-"+me.timeFormat(obj.month)+"-"+me.timeFormat(obj.date)+" "+me.timeFormat(obj.hour)+":"+me.timeFormat(obj.minute);
                    }else {
                        scope.options.calendarValue=obj.year+"-"+me.timeFormat(obj.month)+"-"+me.timeFormat(obj.date)
                    }
                },
                isHourDisabled:function(obj){
                    var me=this;
                    if(new Date(obj.year,obj.month,obj.date,obj.hour).getTime()>new Date(me.options.maxDate.year,me.options.maxDate.month,me.options.maxDate.date,me.options.maxDate.hour).getTime()||new Date(obj.year,obj.month,obj.date,obj.hour).getTime()<new Date(me.options.minDate.year,me.options.minDate.month,me.options.minDate.date,me.options.minDate.hour).getTime()){
                        return true;
                    }else {
                        return false;
                    }
                },
                isMinuteDisabled:function(obj){
                    var me=this;
                    if(new Date(obj.year,obj.month,obj.date,obj.hour,obj.minute).getTime()>new Date(me.options.maxDate.year,me.options.maxDate.month,me.options.maxDate.date,me.options.maxDate.hour,me.options.maxDate.minute).getTime()||new Date(obj.year,obj.month,obj.date,obj.hour,obj.minute).getTime()<new Date(me.options.minDate.year,me.options.minDate.month,me.options.minDate.date,me.options.minDate.hour,me.options.minDate.minute).getTime()){
                        return true;
                    }else {
                        return false;
                    }
                },
                showToday:function(){
                    var me=this;
                    me.showDateTbody({year:new Date().getFullYear(),month:new Date().getMonth()+1,date:new Date().getDate(),hour:new Date().getHours(),minute:new Date().getMinutes()})
                    me.showTimeFormat(me.displayDate);
                    if(me.options.onChoose){
                        me.options.onChoose(scope.options.calendarValue);
                    }
                },
                clearInput:function(){
                    var me=this;
                    scope.options.calendarValue="";
                    me.showSkyCalendar.canShow=false;
                },
                inputBlur:function($event){
                    var me=this;
                    if(!me.showSkyCalendar.mousedown){
                    	if(me.options.isOpen){
                    		me.showSkyCalendar.canShow=false;
                    	}
                    }else {
                        $event.currentTarget.focus();
                    }
                },
                calendarMouseup:function(){
                    var me=this;
                    // console.log("up");
                    me.showSkyCalendar.mousedown=false;
                },
                calendarMousedown:function(){
                    var me=this;
                    me.showSkyCalendar.mousedown=true;
                },
                calendarClick:function(){
                    var me=this;
                    // console.log("dianji");
                    me.showSkyCalendar.mousedown=true;
                },
                inputFocus:function(){
                    var me=this;
                    //me.run(scope.options);
                    me.showSkyCalendar.canShow=true;
                },
                inputClick:function(){
                    var me=this;
                    me.showSkyCalendar.canShow=true;
                }
            }
            sobj.calendar.run(scope.options);
            scope.options.calendarObject=sobj.calendar;
        }
    }
}])