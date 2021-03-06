import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import css from './add.module.scss';

import ICONS from '../../constants/icons';

function Add(props) {
  const [task, setTask] = useState({
    id: localStorage.getItem('taskId') ? Number(localStorage.getItem('taskId')) + 1 : 1,
    icon: 0,
    date: props.location.state.date,
    start: props.location.state.start,
    end: props.location.state.end
  });
  const onConfirm = () => {
    if (!task.name) {
      props.showToast('任务名称不能为空噢！')
    }
    else if (!task.date) {
      props.showToast('任务日期不能为空噢！')
    }
    else if (!task.start) {
      props.showToast('起始时间不能为空噢！')
    }
    else if (!task.end) {
      props.showToast('结束时间不能为空噢！')
    }
    else if (task.end < task.start) {
      props.showToast('结束时间不能早于起始时间噢！')
    }
    else {
      const curTasks = localStorage.getItem('tasks');
      const newTasks = curTasks ? JSON.parse(curTasks).concat([task]) : [task];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      props.showToast('添加成功');
      setTimeout(() => {
        props.history.go(-1);
      }, 1500);
      // 任务id+1
      const taskId = localStorage.getItem('taskId');
      if (taskId) {
        localStorage.setItem('taskId', Number(taskId) + 1);
      }
      else {
        localStorage.setItem('taskId', 1);
      }
    }
  }
  return (
    <div className={css['index']}>
      <div className={css['title']}>
        新增任务
      </div>
      <div className={css['icons']}>
        {ICONS.map((icon, index) => (
          <img
            key={icon}
            alt=''
            className={`${css['icons-icon']} ${task.icon === index ? css['curIcon'] : ''}`}
            src={icon}
            onClick={() => setTask({ ...task, icon: index })}
          />
        ))}
      </div>
      <div className={css['main']}>
        <div className={`${css['name']}`}>
          <div className={`${css['name-subtitle']} ${css['subtitle']}`}>
            任务名称
          </div>
          <input
            className={`${css['name-input']}`}
            type='text'
            onChange={(e) => setTask({
              ...task, name: e.target.value
            })}
          />
          <div className={`${css['name-note']}`}>
            <div>备注</div>
            <textarea
              onChange={(e) => setTask({
                ...task, note: e.target.value
              })}
            />
          </div>
        </div>
        <div className={`${css['date']}`}>
          <div className={`${css['date-subtitle']} ${css['subtitle']}`}>
            任务日期
          </div>
          <input
            type='date'
            defaultValue={task.date}
            onChange={(e) => setTask({
              ...task, date: e.target.value
            })}
          />
        </div>
        <div className={`${css['time']}`}>
          <div className={`${css['time-item']}`}>
            <div className={`${css['subtitle']}`}> 起始时间</div>
            <input
              type='time'
              defaultValue={task.start}
              onChange={(e) => setTask({
                ...task, start: e.target.value
              })}
            />
          </div>
          <div className={`${css['time-item']}`}>
            <div className={`${css['subtitle']}`}>结束时间</div>
            <input
              type='time'
              defaultValue={task.end}
              onChange={(e) => setTask({
                ...task, end: e.target.value
              })}
            />
          </div>
        </div>
        <div className={css['buttons']}>
          <div
            className={`${css['buttons-item']} ${css['buttons-confirm']}`}
            onClick={onConfirm}
          >
            确定
          </div>
          <div
            className={`${css['buttons-item']} ${css['buttons-cancel']}`}
            onClick={() => props.history.go(-1)}
          >
            返回
          </div>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Add);