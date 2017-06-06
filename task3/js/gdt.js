
// localStorage + JSON 存储任务数据
var mData =  {
                allTask: {
                    chosen: false,
                },
                projectList: [
                    {   id: 0,
                        name: '默认分类', 
                        chosen: false,
                        children: [
                            {
                                name: '默认子分类',
                                chosen:false,
                                tasks: [
                                    {
                                        title: '默认子分类1',
                                        date: '2017-08-08',
                                        content: '默认子分类1',
                                        isShow: false,          //任务是否显示在任务列表
                                        isDone: false,          //任务是否完成
                                        chosen:false,           //任务是否被选中在任务列表被选中
                                    }
                                ]
                            }
                        ]
                    },
                    {   id: 1,
                        name: 'IFE项目',
                        chosen: false,
                        children: [
                            {
                                name: 'task0001',
                                chosen:false,
                                tasks: [
                                    {
                                        title: 'to-do1',
                                        date: '2017-04-30',
                                        content: '第一件事。',
                                        isShow: false,
                                        isDone: false,
                                        chosen:false,
                                    },
                                    {
                                        title: 'to-do2',
                                        date: '2017-04-29',
                                        content: '第二件事。',
                                        isShow: false,
                                        isDone: false,
                                        chosen:false,
                                    },
                                    {
                                        title: 'to-do3',
                                        date: '2015-05-05',
                                        content: '第三件事。',
                                        isShow: false,
                                        isDone: false,
                                        chosen:false,
                                    },
                                    {
                                        title: 'to-do4',
                                        date: '2017-04-30',
                                        content: '第四件事。',
                                        isShow: false,
                                        isDone: false,
                                        chosen:false,
                                    },
                                ]
                            },
                            {
                                name: 'task0002',
                                chosen:false,
                                tasks: [
                                    {
                                        title: 't2-do4',
                                        date: '2016-04-30',
                                        content: '第五件事。',
                                        isShow: false,
                                        isDone: false,
                                        chosen:false,
                                    },
                                ]
                            },
                            {
                                name: 'task0003',
                                chosen:false,
                                tasks: []
                            },
                        ]
                    },
                    {   id: 2,
                        name: 'vue',
                        chosen: false,
                        children: [
                            {
                                name: 'task1',
                                chosen:false,
                                tasks: []
                            }
                        ]
                    },
                ],
                taskStatus: [
                    {
                        statu: 'all',
                        content: '所有',
                        chosen: true,
                    },
                    {
                        statu: 'finish',
                        tag: 'icon-certificate',
                        content: '已完成',
                        chosen: false,
                    },
                    {
                        statu: 'unfinish',
                        tag: 'icon-certificate-outline',
                        content: '未完成',
                        chosen: false,
                    },
                ]
            };

if(!localStorage.getItem('tData')) {
    localStorage.tData = JSON.stringify(mData);
};
var taskData = JSON.parse(localStorage.tData);




// 右边栏 任务细节
var taskDetail = new Vue({
    el: '#task-details',
    data: {
        isAddTask: false,           //是否添加新任务
        isEdit: false,              //是否对任务进行编辑
        isTitleNull: false,         //输入框是否为空值
        isDateNull: false,          //输入框是否为空值
        isContentNull: false,       //输入框是否为空值
        theTask: {},                //用于储存被选中的那个任务
        dateHint: '请输入任务日期（格式:xxxx-xx-xx）',
        newTitle: '',               
        newDate: '',
        newContent: '',
        taskData: taskData
    },
    updated: save,
    methods: {
        hideAddTask: function() {
            this.isNull = false;
            this.isAddTask = false;
            this.isEdit = false;
            this.clearDetails();
        },
        taskDone: function() {
            if (!this.theTask.isDone) {
                var result = confirm('确认已经完成？');
                if (result){
                    this.theTask.isDone = true;
                };
            };
            
        },
        clearTitle: function() {
            this.isTitleNull = false;
        },
        clearContent: function() {
            this.isContentNull = false;
        },
        clearDate: function() {
            this.isDateNull = false;
        },
        // 将添加任务的输入框内容初始化
        clearDetails: function() {
            this.isTitleNull = false;
            this.isDateNull = false;
            this.isContentNull = false;
            this.newTitle = '';
            this.newDate = '';
            this.newContent = '';
            this.dateHint = '请输入任务日期（格式:xxxx-xx-xx）';
        },
        // 检查输入的日期是否有效
        // cheDate: function() {
        //     var mDate = this.newDate;
        //     var tDate = new Date(mDate);
        //     var today = new Date();
        //     var result = mDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        //     if(mDate == ''){
        //         this.isDateNull = true;
        //         return false;
        //     } else if (result == null) {
        //         this.isDateNull = true;
        //         this.newDate = '';
        //         this.dateHint = "请输入正确的格式";
        //         return false;
        //     } else if (tDate - today < 0) {
        //         this.isDateNull = true;
        //         this.newDate = '';
        //         this.dateHint = "请输入未来的日期";
        //         return false;
        //     }

        //     var check = result[1] == tDate.getFullYear() && result[2]-1 == tDate.getMonth() && result[3] == tDate.getDate();
        //     if (!check) {
        //         this.newDate = '';
        //         this.dateHint = "请输入正确的日期";
        //         return false;
        //     } else {
        //         return true;
        //     }
        // },
        // 检查输入框的值是否合法
        cheDetail: function() {
            if (this.newTitle == '') {
                this.isTitleNull = true;
                return false;
            } else if (this.newDate == '') {
                this.isDateNull = true;
                this.isTitleNull = false;
                return false;
            } else if (this.newContent =='') {
                this.isDateNull = false;
                this.isContentNull = true;
                return false;
            } else {
                this.isContentNull = false;
                return true;
            }
        },

        editTask: function() {
            if (this.isEdit && this.cheDetail()) {                              //编辑任务
                this.theTask.title = this.newTitle ;
                this.theTask.date = this.newDate;
                this.theTask.content = this.newContent;
                this.theTask.isShow = true;
                this.theTask.isDone = false;
                this.theTask.chosen = true;
                this.hideAddTask();
                return;
            } else if(this.isAddTask && this.cheDetail()) {                     //添加任务
                var newTask = {
                    title: this.newTitle,
                    date: this.newDate,
                    content: this.newContent,
                    isShow: true,
                    isDone: false,
                    chosen:false,
                }
                taskList.choTasks.push(newTask);
                this.hideAddTask();
            };
        },
        showEditTask: function() {
            this.newTitle = this.theTask.title;
            this.newDate = this.theTask.date;
            this.newContent = this.theTask.content;
            this.isEdit = true;

            this.$nextTick(function () {
                $("#datepicker").datepicker({
                        dateFormat: 'yy-mm-dd',
                        minDate: 0,
                        onSelect: function(selectDate){ taskDetail.newDate = selectDate;},
                    });
            })
        },
    }
});



// 中间栏 任务列表
var taskList = new Vue({
    el: '#task-list',
    data: {
            taskData: taskData,
            choTasks: [],         //用于储存被选中分类的所有任务
            isAddValid: false,    //判断能否加入新任务
        },
    updated: save,
    computed: {
        //用于储存按时间聚类后的所有任务
        catTasksByDate: {
            get: function() {
            var choTasks = this.choTasks;
                if(choTasks[0]){
                    choTasks.sort(function(t1, t2) {
                        return new Date(t1.date) - new Date(t2.date);
                    });
                    var tempObj = [];
                    var index = 0;
                    var firstTask = {
                        date: choTasks[0].date,
                        tasks: [choTasks[0]]
                    }
                    tempObj.push(firstTask);
                    for (var i = 1; i < choTasks.length; i++) {
                        if(choTasks[i].date == tempObj[index].date) {
                            tempObj[index].tasks.push(choTasks[i]);
                        } else {
                            index++;
                            var temp = {
                                date:choTasks[i].date,
                                tasks: [choTasks[i]]
                            }
                            tempObj.push(temp);
                        };
                    }
                    return tempObj;
                }
            },
            /*set: function(newValue){
                var _this = this;
                this.choTasks = [];
                newValue.forEach(function(v){
                    v.tasks.forEach(function(taskValue){
                        _this.choTasks.push(taskValue)
                    })
                });
            }*/
        }
    },
    methods: {
            // 用于选择任务的完成状态，并显示处于该状态下的任务
            choSta: function(staIndex) {
                this.taskData.taskStatus.forEach(function(v, k) {
                    v.chosen = staIndex == k;
                });
                switch (staIndex) {
                    case 0:
                        this.choTasks.forEach(function(task) {
                            task.isShow = true;
                        });
                        break;
                    case 1:
                        this.choTasks.forEach(function(task) {
                                task.isShow = task.isDone ? true : false;
                            });
                        break;
                    case 2: 
                        this.choTasks.forEach(function(task) {
                                task.isShow = task.isDone ? false : true;
                            });
                        break;
                }
            },
            // 当该时间段没任务时，时间栏不显示
            isDateShow: function(tasks) {
                var result = false;
                tasks.forEach(function(task) {
                    if (task.isShow){
                        result = true;
                    }
                });
                return result;
            },
            // 显示任务细节栏中的添加任务栏
            showAddTask: function() {
                taskDetail.isAddTask = true;
                this.$nextTick(function () {
                    $("#datepicker").datepicker({
                            dateFormat: 'yy-mm-dd',
                            minDate: 0,
                            onSelect: function(selectDate){ taskDetail.newDate = selectDate;},
                        });
                })
            },
            clearTask: function(){
                this.choTasks.forEach(function(v) {
                    v.chosen = false;
                    });
            },
            // 点击选中该分类的某个任务
            choTask: function(catIndex, taskIndex) {
                if (!this.catTasksByDate[catIndex].tasks[taskIndex].chosen){
                    this.clearTask();
                    taskDetail.theTask = this.catTasksByDate[catIndex].tasks[taskIndex];
                    this.catTasksByDate[catIndex].tasks[taskIndex].chosen = true;
                    taskDetail.hideAddTask();
                }
            },
            delTask: function(catIndex, taskIndex) {
                var result = confirm('确认删除？');
                if (result) {
                    var index = 0;
                    this.catTasksByDate.forEach(function(v, k) {
                        if(k < catIndex) {
                            index += v.tasks.length;
                        } else if (k == catIndex) {
                            index += taskIndex;
                        } 
                    });
                    console.log(index);
                    this.choTasks.splice(index, 1);
                };
            },
        }
        
});
// 弹出窗
var popForm = new Vue({
    el: '#category-pop',
    data: {
            isNull: false,                              //添加分类框是否为空值
            show: false,
            newCat: '',                                 //储存新添加的分类
            selCat: '0',                                 //储存父分类的索引值,初始值设置为0，则下拉列表默认值为第一个select
            taskData: taskData,
        },
    updated: save,
    methods: {
        popClose: function() {
            this.show = false;
            this.isNull = false;
            this.newCat = '';
            this.selCat = '0';
        },
        clear: function () {
            this.isNull = false;
        },
        cheCat: function() {
            if(this.newCat == '') {
                this.isNull = true;
                return false;
            } else {
                return true;
            }
        },
        addCate: function(selCat) {
            if(this.cheCat()){
                var parCatList = this.taskData.projectList;
                if(selCat<1){
                    parCatList.push({
                        id: parCatList[parCatList.length-1].id + 1,
                        name: this.newCat,
                        chosen: false,
                        children: []
                    });
                    this.popClose();
                } else {
                    var _this = this;
                    parCatList.forEach(function(v) {
                        if (v.id == selCat) {
                            v.children.push({
                                name: _this.newCat,
                                chosen: false,
                                tasks: []
                            })
                        };
                    });
                    this.popClose();
                }
            };
        },

    }
});
//左侧栏 任务分类列表
var categoryList = new Vue({
    el: '#task-category',
    data: taskData,
    updated: save,
    methods: {
        // 显示弹出框
        pop: function() {
            popForm.show = true;
        },
        // 点击选择分类
        choAll: function() {
            if (!this.allTask.chosen) {
                    var tempArr = [];
                    this.allTask.chosen = true; 
                    this.projectList.forEach(function(v, k) {
                        v.chosen = false;
                        v.children.forEach(function(childV, childK){
                            childV.chosen = false;
                            tempArr.push.apply(tempArr, childV.tasks);
                        });
                    });
                    taskList.clearTask();
                    taskList.choTasks = tempArr;
                    taskList.choSta(0);  // 选择分类项目后,中间栏自动选择所有，展示该分类的所有任务
                    taskList.isAddValid = false;
                };
        },
        choCat: function(index) {
            if(!this.projectList[index].chosen) {
                var tempArr = [];
                this.allTask.chosen = false;
                this.projectList.forEach(function(v, k) {
                    var eachFun;
                    if (v.chosen = k == index) {
                        eachFun = function(childV, childK){
                        childV.chosen = false;
                        tempArr.push.apply(tempArr, childV.tasks);
                        }
                    } else {
                        eachFun = function(childV, childK){
                        childV.chosen = false;
                        }
                    }
                    v.children.forEach(eachFun);
                });
                taskList.clearTask();
                taskList.choTasks = tempArr;
                taskList.choSta(0); 
                taskList.isAddValid = false;
            }
        },
        choSubCat: function(childIndex, index){
            if(!this.projectList[index].children[childIndex].chosen) {
                taskList.clearTask();
                taskList.choTasks = this.projectList[index].children[childIndex].tasks;
                taskList.choSta(0);
                taskList.isAddValid = true;

                this.allTask.chosen = false;
                this.projectList.forEach(function(v, k) {
                    v.chosen = false;
                    v.children.forEach(function(childV, childK){
                        childV.chosen = k == index && childK == childIndex;
                    })
                });
            }
        },
        // 显示分类中任务的数量
        showTaskNum: function(index) {
            return this.projectList[index].children.reduce(function(p, n){
                return p += n.tasks.length;
            }, 0);
        },
        showAllTaskNum: function() {
            var num = 0;
            this.projectList.forEach(function(v){
                v.children.forEach(function(childV) {
                    num += childV.tasks.length;
                })
            });
            return num;
        },
        // 删除分类
        delCat: function(index) {
            var result = confirm('确认删除？');
            if (result) {
                this.projectList.splice(index,1);
            };
        },
        delChild: function(childIndex, index) {
            var result = confirm('确认删除？');
            if (result) {
                this.projectList[index].children.splice(childIndex,1);
            };
        }
    }
});
//保存数据到本地
function save() {
    localStorage.tData = JSON.stringify(taskData);
};

categoryList.allTask.chosen = false;
categoryList.choAll();
taskList.clearTask();