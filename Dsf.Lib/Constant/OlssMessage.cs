
namespace Dsf.Lib.Constant
{
    public static class OlssMessage
    {
        public const string InsertSuccess            = "The data has been successfully inserted";
        public const string InsertError              = "The data has been failed to insert, please contact your Administrator";

        public const string RALEndorsee              = "RAL Endorsee is required.";
        public const string RALObject                = "RAL Object is required.";

        public const string SaveSuccess              = "The data has been successfully saved";
        public const string SaveError                = "The data has been failed to save, please contact your Administrator";

        public const string SubmitSuccess            = "The data has been successfully submitted";
        public const string SubmitError              = "The data has been failed to submitted, please contact your Administrator";
        public const string EmailError               = "Email Setting of Visit Customer Survey for the related branch is not exist, please contact your Administrator";

        public const string UpdateSuccess            = "The data has been successfully Updated";
        public const string UpdateError              = "The data has been failed to update, please contact your Administrator";
        public const string UpdateErrorStatusChanged = "The status has been changed by other user, The data has been failed to update";
        public const string UpdateNotAuthorized      = "You're not allowed to update this document";
        public const string UpdateInvoiceReceiptSuccess = "Invoice No : {0} has been updated"; //added by Sonny (13 Feb 2018) untuk pesan sukses

        public const string SignInError              = "Wrong username or password";
        public const string SignInNotRegisteredError = "User still not registered in Operating Lease System";

        public const string ActivateSuccess          = "The data has been successfully Activated";
        public const string ActivateError            = "The data has been failed to Activate";

        public const string DeactivateSuccess        = "The data has been successfully Deactivated";
        public const string DeactivateError          = "The data has been failed to Deactivate";

        public const string SaveasDraftSuccess       = "The data has been saved as draft"; 
        public const string SaveasDraftError         = "The data has been failed to saved as draft";

        public const string SetToDraftSuccess        = "The data has been saved as draft";
        public const string SetToDraftError          = "The data has been failed to saved as draft";

        public const string SetToValidSuccess = "The data has been set to valid"; //added by Sonny (28 Feb 2018) untuk mengembalikan ke valid dari set draft
        public const string SetToValidError = "The data has been failed to set to valid";  //added by Sonny (28 Feb 2018) untuk mengembalikan ke valid dari set draft

        public const string ValidateSuccess          = "The data has been successfully Validated";

		public const string SaveasDraftSuccessCvs	 = "Survey Number: {0} has been saved";
		public const string SubmitSuccessCvs		 = "Survey Number: {0} has been submitted";
		public const string SaveChangesSuccessCvs	 = "Survey Number: {0} has been updated";

        public const string SaveasDraftSuccessSkd    = "SKD Number: {0} has been saved";
        public const string SubmitSuccessSkd         = "SKD Number: {0} has been submitted";
        public const string UpdateSuccessSkd         = "SKD Number: {0} has been updated";

        public const string ForbiddenAccessCreateBASTNullUnitPrepId = "Unit Preparation with id {0} doesn't exist!";
        public const string ForbiddenAccessCreateBASTDeletedUnitPrepId = "Unit Preparation with id {0} has been deleted!";
        public const string ForbiddenAccessCreateBASTNonCreatableUnitPrepId = "Can't create new BAST because Unit Preparation with id {0} is not Parent Item";
        public const string ForbiddenAccessCreateBASTNullBastActualDate = "Can't create new BAST because BASTActualDate value for Unit Preparation with id {0} is null";
        public const string SaveasDraftErrorBast = "BAST Document already completed, remaining BAST is 0!";
        public const string SaveAsDraftSuccessBast = "BAST Supplier Number: {0}BAST Customer Number: {1} has been created and Remaining BAST is {2}!";
		public const string SaveAsFinalSuccessBast = "BAST Supplier Number: {0} and BAST Customer Number: {1} has been completed!";
		public const string SaveChangesSuccessBast = "BAST Supplier Number: {0} and BAST Customer Number: {1} has been updated!";

        public const string ForbiddenAccessRegRPCIsNotExist = "Register Replacement data with id {0} doesn't exist!";
        public const string ForbiddenAccessRegRPCIsDelete = "Register Replacement data with id {0} has been deleted!";
        public const string ForbiddenAccessBASTReplacementUnitIsNotExist = "BAST Replacement Unit data with id {0} doesn't exist!";
        public const string ForbiddenAccessBASTOPLUnitIsNotExist = "BAST OPL Unit data with id {0} doesn't exist!";
        public const string ForbiddenAccessBASTReplacementUnitIsDelete = "BAST Replacement Unit data with id {0} has been deleted!";
        public const string ForbiddenAccessBASTOPLUnitIsDelete = "BAST OPL Unit data with id {0} has been deleted!";
        public const string ForbiddenAccessBASTReplacementSubmitted = "Can't edit BAST Replacement because BAST Replacement has been submitted!";
        public const string ForbiddenAccessBASTReplacementFirmed = "Can't edit BAST Replacement because BAST Replacement has been completed!";
        public const string ForbiddenCreateBASTOut = "Can't create BAST Out, the previous BAST Out has not firmed!";


        public const string RpcReg = "Registration Number: {0} has been registered!";
        public const string RpcUpd = "Registration Number: {0} has been updated!";

        public const string SaveAsDraftSuccessBastRpc = "BAST Replacement Number: {0} has been created!";
        public const string SaveAsDraftSuccessBastRpcMemo = "BAST Replacement Number: {0} and Memo Number: {1} has been created!";
        public const string SaveChangesSuccessBastRpc = "BAST Replacement Number: {0} has been updated!";
        public const string SubmitSuccessBastRpc = "BAST Replacement Number: {0} has been submitted!";
        public const string SaveAsFinalSuccessBastRpc = "BAST Replacement Number: {0} has been completed!";

        public const string SaveasDraftSuccessAgreement = "Agreement Number: {0} has been saved";
        public const string SubmitSuccessAgreement      = "Agreement Number: {0} has been submitted";
        public const string UpdateSuccessAgreement      = "Agreement Number: {0} has been updated";

        public const string SaveasDraftSuccessPurchaseOrder = "Purchase Order Number : {0} has been saved";
        public const string SubmitSuccessPurchaseOrder = "Purchase Order Number : {0} has been submitted";
        public const string UpdateSuccessPurchaseOrder = "Purchase Order Number : {0} has been updated";

        public const string SubmitSuccessEscalate = "Approval Path for {0} with document number: {1} has been successfully escalated";
        public const string SaveSuccessUnitPrep = "Your data successfully updated";
        public const string SaveErrorUnitPrep = "Your data has been failed to updated, please contact your Administrator";

        public const string ModuleNumberSuccess      = "{0} Number: {1} has been {2}.";
        public const string ModuleNumberSaveSuccess = "{0} Number: {1} has been successfully saved";

        public const string PrintReport              = "Print Report {0} has been successfully printed";

	    public const string NotAuthorizedEditDocument= "You are not authorized to edit the document";

		public const string ApprovalPathNotPrepared = "Approval Path Status still has not been created or still Inactive, please contact your Administrator";

        public const string SysNumberingLimit =
            "Cannot create Document, document number has reached maximum limit.";

        public const string AccessoriesCarroseriesRemains = "There are remaining Accessories/Carroserrie that still haven't been created in an Agreement. Please include the Agreement with the Accessories/Carroserrie paired with at least 1 Unit.";

        public const string PathInsertError = "The data has been failed to insert, your input data already exist.";

        public const string SendRemainderEmailSuccess = "Email of Reminder Billing of {0} to {1} has been sent.";
        public const string SendRemainderEmailFailed = "Email of Reminder Billing of {0} to {1} failed.";
        public const string SendRemainderEmailConcurrencyError = @"The record you attempted to update "
                                                                + "was modified by another user after you got the original value. The "
                                                                + "update operation was canceled. Please send reminder email again.";

        public const string UpdatePaymentToPaySuccess = "Promise To Pay for Agreement Number: {0} has been saved.";
        public const string UpdatePaymentToPayConcurrencyError = @"The record you attempted to update "
                                                                + "was modified by another user after you got the original value. The "
                                                                + "update operation was canceled. Please update promise to pay again.";

        public const string ActionCloseAgreement = "Contract with Agreement Number: {0} successfully Closed";

        public const string SaveSuccessDeliveryInvoice = "Delivery Invoice for Agreement Number: {0} has been saved";
        public const string UpdateInvoiceConcurrencyError = @"The record you attempted to update "
                                                        + "was modified by another user after you got the original value. The "
                                                        + "update operation was canceled. Please update delivery invoice again.";
        public const string CopySuccess = "The data has been successfully Copied.";

        public const string SaveasDraftSuccessMtnWorkOrder = "Maintenance Work Order Number : {0} has been saved";
        public const string SubmitSuccessMtnWorkOrder = "Maintenance Work Order Number : {0} has been submitted";
        public const string UpdateSuccessMtnWorkOrder = "Maintenance Order Number : {0} has been updated";

        public const string SaveEditBilling = "Success! Billing data for Agreement Number: {0} has been successfully {1}";
        public const string SaveRAL = "Success! Your data for RAL in Agreement Number: {0} has been successfully {1}";
        public const string DocumentNotValid = "Document that you try to open is not valid.";

        public const string CurrentPeriodWarningLetterExist = "Warning Letter for Agreement Number: {0} in selected period is already created";
        public const string SaveAsDraftWarningLetterSuccess = "Warning Letter Number: {0} has been saved.";
        public const string SubmitWarningLetterSuccess = "Warning Letter Number: {0} has been submit.";

        public const string SaveAsDraftRALSuccess = "RAL for Agreement Number: {0} has been saved.";
        public const string SubmitRALSuccess = "RAL for Agreement Number: {0} has been submitted.";

        public const string OplUnitExist = "Police Number with selected Product Name already exist on data master.";
        public const string OplUnitNotExist = "Police Number with selected Product Name has not exist on data master.";
        public const string OplUnitPrevAgreementStillOpen = "Agreement of the OPL Unit is still open.";

        public const string SaveMemo = "Reminder Memo for Agreement Number: {0} Successfully saved.";

        public const string SaveBillPaymentHistory = "Input payment billing for agreement number: {0} successfully saved.";
    }
}