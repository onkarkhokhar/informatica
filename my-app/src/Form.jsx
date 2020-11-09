import React, { useState, useEffect } from 'react';
import metaData from './entityMeta.json'
import Data from './entityData.json'
import { Form, Modal, Button, Icon } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Moment from 'moment-timezone';


var original = {};

const App = () => {
    const [partyType, setPartyType] = useState('');
    const [suffix, setSuffix] = useState('');
    const [updatedBy, setUpdatedBy] = useState('');
    const [creator, setCreator] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [taxId, setTaxId] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(true);
    const [obj, setObj] = useState({})

    useEffect(() => {
        console.log(Data);
        console.log(metaData)
    }, [])

    useEffect(() => {
        if (Data) {
            if(Data.firstName)
                setFirstName(Data.firstName);
            else
                setFirstName("");

            if(Data.lastName)
                setLastName(Data.firstName);
            else
                setLastName('');
            
            if(Data.middleName)
                setMiddleName(Data.middleName);
            else
                setMiddleName('');
            
            if(Data.generationSuffixCd)
                setSuffix(Data.generationSuffixCd);
            else
                setSuffix('');

            if(Data.partyType){
                setPartyType(Data.partyType);
            } else
                setPartyType('');
            
            if(Data.taxId)
                setTaxId(Data.taxId);
            else
                setTaxId('');

            if(Data.status)
                setStatus(Data.status);
            else
            setStatus('');

            if(Data.birthdate)
                setDate(formatDateUTC(Data.birthdate));
            else
                setDate('');
            if(Data.creator)
                setCreator(Data.creator);
            else
                setCreator('');
            if(Data.updatedBy)
                setUpdatedBy(Data.updatedBy);
            else
                setUpdatedBy('');
        }else{
            setPartyType("");
            setFirstName('');
            setLastName('');
            setStatus('');
            setDate('');
            setTaxId('');
            setMiddleName('');
            setSuffix('');
            setUpdatedBy('');
            setCreator('');
        }
    }, [Data]);

    const submitClicked = () => {
        setObj(original);
        setOpen(false);
    }

    const renderObj = () => (
        <div>
          <h4>{JSON.stringify(original, null, 2)}</h4>
        </div>
      )


    const handleInputChange = (e, { name, value }) => {
        if (name === 'partyType') {
            setPartyType(value);
            original.partyType=value;
        } else if (name === 'lastName') {
            setLastName(value);
            original.lastName=value;
        } else if (name === 'firstName') {
            setFirstName(value);
            original.firstName=value;
        } else if (name === 'middleName') {
            setMiddleName(value);
            original.middleName=value;
        } else if (name === 'suffix') {
            setSuffix(value);
            original.suffix=value;
        } else if (name === 'status') {
            setStatus(value);
            original.status=value;
        } else if (name === 'creator') {
            setCreator(value);
            original.creator=value;
        } else if (name === 'updatedBy') {
            setUpdatedBy(value);
            original.updatedBy=value;
        } else if (name === 'taxId') {
            setTaxId(value);
            original.taxId=value;
        }
    }

    const handleDateChange=(e,value)=>{
        setDate(value)
        original.date=value;
    }

    const formatDateUTC = (date, format = "MMMM DD, Y - h:mm:ss a") => {
        let fomattedDate = Moment(date, ["YYYY", Moment.ISO_8601]).tz('UTC').format(format);
        return fomattedDate;
    }


    return (
        <div>
            {open ?
                <Modal open={open}>
                <Modal.Header>Please fill up the form</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group>
                            <Form.Input width={8} value={partyType} required fluid label='Party Type' name='partyType'  onChange={handleInputChange}/>
                            <Form.Input width={8} value={suffix} fluid label='Name Suffix' name='suffix' onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                width={8}
                                required
                                name='lastName'
                                label='Last Name'
                                value={lastName}
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                width={8}
                                name='middleName'
                                label='Middle Name'
                                value={middleName}
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                width={8}
                                label='First Name'
                                required
                                name='firstName'
                                value={firstName}
                                onChange={handleInputChange}
                            />

                        </Form.Group>
                        <DateInput
                            clearable
                            name="date"
                            label="Date of Birth"
                            value={date}
                            onChange={(e,{value})=>handleDateChange(e,value)}
                        />
                        <Form.Group>
                            <Form.Input width={8} value={taxId} required fluid label='Tax Id' name='taxId'  onChange={handleInputChange}/>
                            <Form.Input width={8}  value={status}required fluid label='Status' name='status'  onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input width={8} value={creator} required fluid label='Creator' name='creator'  onChange={handleInputChange}/>
                            <Form.Input width={8} value={updatedBy} required fluid label='Updated By' name='updatedBy'  onChange={handleInputChange}/>
                        </Form.Group>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button
                    positive
                    content='save'
                    onClick={submitClicked}
                />
            </Modal.Actions>
            </Modal>
            :
            renderObj()
            
            }
            
        </div>
    )

}
export default App;
