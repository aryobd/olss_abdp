using System;
using System.Data;
using System.Reflection;
using System.Collections.Generic;
using System.Diagnostics;

namespace Dsf.Lib  
{
    /// <summary>
    /// Provides utility features for testing.
    /// </summary>
    public static class DebugUtil
    {
        /// <summary>
        /// Print object by the class for Debug.
        /// </summary>
        /// <param name="obj">print target object</param>
        /// <param name="parameters">print parameters</param>
        public static void DebugPrint(object obj, params string[] parameters)
        {
            if (obj is string)
                Trace.WriteLine(string.Format((string)obj, parameters));

            else if (obj is DataSet)
                PrintDataSet((DataSet)obj, parameters);

            else if (obj is DataTable)
                PrintDataTable((DataTable)obj, parameters);

            else if (obj is DataRow)
                PrintDataRow((DataRow)obj, parameters);
        }

        #region Sub functions for DebugPrint

        private static void PrintDataSet(DataSet dataSet, params string[] parameters)
        {
            if (dataSet == null)
                return;

            DebugPrint("SET:{0}. {1}", dataSet.DataSetName, string.Join(",", parameters));
            foreach (DataTable table in dataSet.Tables)
            {
                DebugPrint(table);
            }
        }

        private static void PrintDataTable(DataTable table, params string[] parameters)
        {
            if (table == null)
                return;

            //Print table header
            DebugPrint("\tTABLE:{0}. {1}", table.TableName, string.Join(",", parameters));

            //Print Columns
            Trace.Write("\t\tCOL:");
            foreach (DataColumn col in table.Columns)
            {
                Trace.Write(string.Format("\t{0}", col.ColumnName));
            }
            Trace.WriteLine(string.Empty);

            //Print Rows
            foreach (DataRow row in table.Rows)
            {
                if (row.RowState == DataRowState.Deleted)
                    continue;

                DebugPrint(row);
            }
        }

        private static void PrintDataRow(DataRow row, params string[] parameters)
        {
            if (row == null || row.RowState == DataRowState.Deleted)
                return;

            Trace.Write(string.Format("\t\tROW:{0}", string.Join(",", parameters)));
            foreach (DataColumn col in row.Table.Columns)
            {
                Trace.Write(string.Format("\t{0},", row[col]));
            }
            Trace.WriteLine(string.Empty);
        }

        #endregion
    }
}
