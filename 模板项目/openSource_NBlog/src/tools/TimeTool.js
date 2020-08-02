/**
 * Created by plter on 2016/12/24.
 */

const TimeTool = {
    formatTime: function (time) {
        return `${time >= 10 ? "" : "0"}${time}`;
    },
    getFormattedDateString: function (date) {
        return `${date.getFullYear()}-
${TimeTool.formatTime(date.getMonth())}-
${TimeTool.formatTime(date.getDate())} 
${TimeTool.formatTime(date.getHours())}:
${TimeTool.formatTime(date.getMinutes())}:
${TimeTool.formatTime(date.getSeconds())}`;
    }
};

module.exports = TimeTool;