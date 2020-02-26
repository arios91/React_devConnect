import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        field: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleToDate] = useState(false);

    const {school, degree, field, from, to, current, description} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const submitForm = e => {
        e.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Education
            </h1>
            <small>* = required field</small>
            <form className="form" onSubmit={e =>submitForm(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* School" name="school" required value={school} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" required value={degree} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Field" name="field" required value={field} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)}/>
                </div>
                    <div className="form-group">
                    <p>
                        <input 
                            type="checkbox" 
                            name="current" 
                            checked={current} 
                            value={current} 
                            onChange={e => {
                                setFormData({...formData, current: !current});
                                toggleToDate(!toDateDisabled);
                                }}/> 
                        {' '}Current
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(AddEducation)
