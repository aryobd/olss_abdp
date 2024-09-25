--Select 'Customer' as tablename, 'Ayu' as name
Select GETDATE() AS PrintedDate,
@username as PrintedBy,
CONCAT(@txtStartDate,' - ',@txtEndDate) AS Period,
(CASE 
	WHEN @txtSearch = '' THEN 'ALL'
	WHEN @ddlSearchCriteria = 7 AND @txtSearch != '' THEN @txtSearch
	ELSE ' - '
	END)AS Stat