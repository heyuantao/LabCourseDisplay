# -*- coding: utf-8 -*-
import numpy
import pandas as pd
import xlrd
import xlwt
import re
from io import BytesIO


#该类的代码用于解决读取Excel文件时合并的单元格所产生的无数据问题
class LabCourseXLSXReader:
    def __init__(self):
        pass

    @classmethod
    def adjust_df(cls, df):
        #Delete the useless head title and rebuild index
        adjusteddf = df.drop([0, 1])
        adjusteddf.reset_index(drop=True, inplace=True)

        #rename the first line as column name
        adjusteddf.columns = adjusteddf.iloc[0]
        adjusteddf = adjusteddf[1:]

        return adjusteddf

    #从内存中的文件内容转换为pd格式的数据
    @classmethod
    def read_memory_excel_content_to_pd(cls, content):
        # 打开文件
        workbook = xlrd.open_workbook(file_contents=content)
        # 获取所有sheet
        # print('打印所有sheet:', workbook.sheet_names())

        sheet2 = workbook.sheet_by_index(0)  # sheet索引从0开始
        rows_num = sheet2.nrows  # 行数
        cols_num = sheet2.ncols  # 列数
        merged = cls.get_merged_cells(sheet2)  # 获取所有的合并单元格
        data = []
        for r in range(rows_num):
            # 一行数据的实体类
            entity_dict = {}
            for c in range(cols_num):
                cell_value = sheet2.row_values(r)[c]
                # print('第%d行第%d列的值：[%s]' % (r, c, sheet2.row_values(r)[c]))
                if (cell_value is None or cell_value == ''):
                    cell_value = (cls.get_merged_cells_value(sheet2, merged, r, c))
                    # 构建Entity
                the_key = 'column' + str(c + 1);
                # 动态设置各属性值
                entity_dict[the_key] = cell_value
            data.append(entity_dict)
        df = pd.DataFrame(data)

        finaldf = cls.adjust_df(df)
        # writer=pd.ExcelWriter(outputpath)
        # df.to_excel(writer,"Sheet",index=False)
        # df.to_csv(outputpath, index=False, header=False)
        return finaldf


    @classmethod
    def read_excel_to_pd(cls, inputpath):
        # 打开文件
        workbook = xlrd.open_workbook(inputpath)
        # 获取所有sheet
        # print('打印所有sheet:', workbook.sheet_names())

        sheet2 = workbook.sheet_by_index(0)  # sheet索引从0开始
        rows_num = sheet2.nrows  # 行数
        cols_num = sheet2.ncols  # 列数
        merged = cls.get_merged_cells(sheet2)  # 获取所有的合并单元格
        data = []
        for r in range(rows_num):
            # 一行数据的实体类
            entity_dict = {}
            for c in range(cols_num):
                cell_value = sheet2.row_values(r)[c]
                # print('第%d行第%d列的值：[%s]' % (r, c, sheet2.row_values(r)[c]))
                if (cell_value is None or cell_value == ''):
                    cell_value = (cls.get_merged_cells_value(sheet2, merged, r, c))
                    # 构建Entity
                the_key = 'column' + str(c + 1);
                # 动态设置各属性值
                entity_dict[the_key] = cell_value
            data.append(entity_dict)
        df = pd.DataFrame(data)

        finaldf = cls.adjust_df(df)
        # writer=pd.ExcelWriter(outputpath)
        # df.to_excel(writer,"Sheet",index=False)
        # df.to_csv(outputpath, index=False, header=False)
        return finaldf

    @classmethod
    def get_merged_cells(cls, sheet):
        """
        获取所有的合并单元格，格式如下：
        [(4, 5, 2, 4), (5, 6, 2, 4), (1, 4, 3, 4)]
        (4, 5, 2, 4) 的含义为：行 从下标4开始，到下标5（不包含）  列 从下标2开始，到下标4（不包含），为合并单元格
        :param sheet:
        :return:
        """
        return sheet.merged_cells

    @classmethod
    def get_merged_cells_value(cls, sheet, merged, row_index, col_index):
        """
        先判断给定的单元格，是否属于合并单元格；
        如果是合并单元格，就返回合并单元格的内容
        :return:
        """
        for (rlow, rhigh, clow, chigh) in merged:
            if (row_index >= rlow and row_index < rhigh):
                if (col_index >= clow and col_index < chigh):
                    cell_value = sheet.cell_value(rlow, clow)
                    # print('该单元格[%d,%d]属于合并单元格，值为[%s]' % (row_index, col_index, cell_value))
                    return cell_value
                    break
        return None

class CourseDFProcessor:

    def __init__(self):
        pass

    @classmethod
    def parseRowData(cls, df):
        parsed_date_list = []
        parsed_course_order_list = []
        parsed_course_teacher_list = []
        for i, r in df.iterrows():
            origin_data = r['日期']
            origin_time = r['时间']

            #print("{} - {}".format(origin_data, origin_time))

            parsed_date = cls._parseDataFromString(origin_data)
            parsed_course_order = cls._parseCourseOrderFromString(origin_time)
            parsed_course_teacher = cls._parseCourseTeacher(r['教师'], r['实验辅导教师'])

            parsed_date_list.append(parsed_date)
            parsed_course_order_list.append(parsed_course_order)
            parsed_course_teacher_list.append(parsed_course_teacher)

        df = df.drop(columns='日期')
        df = df.drop(columns='时间')
        df = df.drop(columns='教师')
        df = df.drop(columns='实验辅导教师')

        df = df.assign(日期 = parsed_date_list)
        df = df.assign(节次 = parsed_course_order_list)
        df = df.assign(教师 = parsed_course_teacher_list)

        df.rename(columns={'学生': '学生人数'}, inplace=True)

        #部分表格存在无实验室房间信息的情况
        df['实验室'] = df['实验室'].replace(numpy.nan, '无实验室房间信息')

        return df

    @classmethod
    def _parseDataFromString(cls, origin_data_str):
        match_data_group = re.search(r"(\d{2}月\d{2}日)", origin_data_str)
        match_str = match_data_group.group(0).replace("月", "-").replace("日", "")
        return match_str

    @classmethod
    def _parseCourseOrderFromString(cls, origin_time_str):
        match_course_order_data_group = re.search(r"(\d{1,2}-\d{1,2})", origin_time_str)
        return match_course_order_data_group.group(0)

    @classmethod
    def _parseCourseTeacher(cls, originCourseTeacher, originLabTeacher):

        if isinstance(originCourseTeacher, type(None)):
            originCourseTeacher = ""
        if isinstance(originLabTeacher, type(None)):
            originLabTeacher = ""

        if len(originLabTeacher) != 0:
            return originLabTeacher
        if (len(originLabTeacher) == 0) and (len(originCourseTeacher) != 0):
            return originCourseTeacher
        else:
            return "无教师信息"

#测试代码
if __name__ == "__main__":
    '''
    df = LabCourseXLSXReader.read_excel_to_pd("./data/test2.xlsx")
    df = CourseDFProcessor.parseDateAndTime(df)
    pd.set_option('display.max_columns', None)
    print(df.head(20))
    '''


    file = open("./data/test2.xlsx", "rb")
    content = file.read()
    df = LabCourseXLSXReader.read_memory_excel_content_to_pd(content)
    df = CourseDFProcessor.parseRowData(df)
    pd.set_option('display.max_columns', None)
    print(df.head(20))