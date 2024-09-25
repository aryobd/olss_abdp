SELECT CONCAT(DATEPART(MM,GETDATE()),'/',DATEPART(DD,GETDATE()),'/',DATEPART(YYYY,GETDATE())) AS PrintedDate,
@username AS Printedby,
@custName AS CustomerName,
@agrNumber AS AgreementNumber,
CONCAT(@txtStartDate,' - ',@txtEndDate) AS Period