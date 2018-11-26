/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope Public
 */
define(['N/email', 'N/record', 'N/ui/serverWidget'],
/**
 * @param {email} email
 * @param {record} record
 * @param {serverWidget} serverWidget
 */
function(email, record, serverWidget) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
        var recNewRecord = scriptContext.newRecord;
        var objForm = scriptContext.form;
        var objFieldToHide = objForm.getField({id: 'class'});
      
        objFieldToHide.updateDisplayType({displayType: serverWidget.FieldDisplayType.HIDDEN});
        recNewRecord.setValue({fieldId: 'memo', value: 'This memo was set by 433965'});

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
      var stFieldId = '';
      var recNewRecord = scriptContext.newRecord;

      var stValue = recNewRecord.getValue({fieldId: 'custbody_acen_sec_cust_it'});
        
      if(stValue == '')
      {
          recNewRecord.setValue({fieldId: 'otherrefnum', value: '433965'});
      }
      else{
        recNewRecord.setValue({fieldId: 'otherrefnum', value: 'Not Available'});
      }
      
    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {
      var recNewRecord = scriptContext.newRecord;
      var objCurrentUser = runtime.getCurrentUser();
      
      var stValue = recNewRecord.getValue({fieldId: 'department'});
      if(stValue == ''){
        var stMessage = 'Invoice was created with empty department.';
      }
      else{
        var stMessage = 'Invoice was created with department id: '+ stValue;
      }
      email.send({
        author: objCurrentUser.id,
        recipients: objCurrentUser.id,
        subject: 'Invoice created',
        body: stMessage
      });

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
