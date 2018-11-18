/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define(['N/ui/dialog', 'N/ui/message'],
/**
 * @param {dialog} dialog
 * @param {message} message
 */
function(dialog, message) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
		var objMessage = message.create({
          title: 'WARNING',
          message: 'Constraints on some fields may have been changed.',
          type: message.Type.WARNING
          });
          objMessage.show({
            duration: 5000
          });
    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
      	      
		var stFieldId = scriptContext.fieldId;
    	// Store current record into variable
    	var recCurrentRecord = scriptContext.currentRecord;
      	// If currency field changed
    	if(stFieldId == 'currency')
		{
            // Get value of currency
        	var stCurrency = recCurrentRecord.getValue({
                fieldId : stFieldId
            });
            // Get industry type text
            var stCurrencyText = recCurrentRecord.getText({
                fieldId : stFieldId
            });
       		if(stCurrencyText == 'EUR')
            {
	            // Show alert window - warn user about default department value for 'EUR'
    	        dialog.alert({
                title: 'Currency changed',
                message : 'PO currency was set to ' + stCurrencyText+ '. Please note that a department field will be set defaultly to "IT" after saving the record.'
                });    		
                }
		}
    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {
      var stFieldId = scriptContext.fieldId;
      var recCurrentRecord = scriptContext.currentRecord; 
      
      if (stFieldId == 'memo')
      {
      	var stValue = recCurrentRecord.getValue({
        	fieldId : 'memo'
        });
        
        if (stValue != '')
        {
        	//Message for user that memo must be empty (dialog alert)
        	alert({title: 'Memo field', message: 'This field must stay empty!'});
        	return false;
        }
        else
        {
        	return true;
        }
      }
      return true;

    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {
      	
		var recCurrentRecord = scriptContext.currentRecord;
      	var stValue = recCurrentRecord.getValue({fieldId: 'currency'});
      	//Get chosen currency
      	var stText = recCurrentRecord.getText({fieldId: 'currency'});
      	if (stText == 'USD')
        {
        	var objMessage = message.create({
            	title: 'Cannot save the order',
                message: 'Saving prevented by 433965',
                type: message.Type.ERROR
            });
            objMessage.show({
              duration: 10000
            });
            //Prevent saving PO            
            return false;
          }
      if (stText == 'EUR')
        {
            dialog.alert({title: 'Default department', message: 'After saving PO, the department will change to "IT".'});
            //recCurrentRecord.setText({fieldId: 'department', text: 'IT'});
            recCurrentRecord.setValue({fieldId: 'department', value: '3'});
        }
      return true;
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
//        postSourcing: postSourcing,
//        sublistChanged: sublistChanged,
//        lineInit: lineInit,
        validateField: validateField,
//        validateLine: validateLine,
//        validateInsert: validateInsert,
//        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
