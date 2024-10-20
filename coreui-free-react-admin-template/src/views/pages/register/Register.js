import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useState, useEffect } from 'react'
import api from '../../../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants'

import {
  cilBuilding,
  cilCreditCard,
  cilLibrary,
  cilLibraryBuilding,
  cilLockLocked,
  cilUser,
  cilFingerprint,
  cilLanguage,
} from '@coreui/icons'
import { useSearchParams } from 'react-router-dom'

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = atob(searchParams.get('type')).trim().normalize()
  const navigate = useNavigate()

  const acceptedTypes = ['Delegate', 'Security', 'Press', 'Chair', 'Runner']

  const opened_registerations = ['Delegate']

  useEffect(() => {
    if (acceptedTypes.indexOf(type) === -1) {
      navigate('/404')
    }

    if (opened_registerations.indexOf(type) === -1) {
      navigate('/closed')
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    role: type,
    fullName: '',
    email: '',
    gradeLevel: '',
    phone: '',
    cpr: '',
    school: '',
    additional_data: {
      munExperience: '',
      healthIssues: '',
      allergies: '',
      sec_1: '',
      sec_2: '',
      sec_3: '',
      sec_4: '',
      run_1: '',
      run_2: '',
      run_3: '',
      cha_1: '',
      cha_2: '',
      cha_3: '',
      del_1: '',
      del_2: '',
      del_3: '',
      del_4: '',
      del_5: '',
      pre_1: '',
      pre_2: '',
      pre_3: '',
      pre_4: '',
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name in formData.additional_data) {
      setFormData((prevData) => ({
        ...prevData,
        additional_data: {
          ...prevData.additional_data,
          [name]: value,
        },
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const description_dictionary = {
    Delegate:
      'BAYMUN XVII will be held on <b>November 22 & 23, 2024</b> <br>It is MANDATORY that delegates attend the conference on both days <br>DEADLINE for registration is on <b>November 8th, 2024</b><br>If your school name is not available and you are looking forward to attending our conference, please reach out to us',
    Security:
      'BAYMUN XVII will be held on <b>November 22 & 23, 2024</b><br>DEADLINE for registration is on <b>October 17th, 2024</b>',
    Runner:
      'BAYMUN XVII will be held on <b>November 22 & 23, 2024</b><br>DEADLINE for registration is on <b>October 17th, 2024</b>',
    Chair:
      'BAYMUN XVII will be held on <b>November 22 & 23, 2024</b><br>DEADLINE for registration is on <b>October 20th, 2024</b><br>If your school name is not available and you are looking forward to attending our conference, please reach out to us',
    Press:
      'BAYMUN XVII will be held on <b>November 22 & 23, 2024</b><br>DEADLINE for registration is on <b>October 20th, 2024</b><br>If your school name is not available and you are looking forward to attending our conference, please reach out to us',
  }

  const message_desciption = {
    Delegate: 'Note: Grades 9-12 only! (and 8th graders from BBS)',
    Security: 'Note: Only for Grade 12!',
    Runner: 'Note: Grades 10-12 only!',
    Chair: 'Note: Grades 10-12 only!',
    Press: 'Note: Grades 10-12 only!',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const csrf = await api.get('api/csrf')
      //setCsrfToken(csrf.data.csrfToken);

      var gradeLevel_temp = formData.gradeLevel
      var school_temp = formData.school

      if (gradeLevel_temp === '') {
        gradeLevel_temp = '12'
      }
      if (school_temp === '') {
        school_temp = 'BBS'
      }

      const res = await api.post(
        'api/user_info/register/',
        {
          role: formData.role,
          fullName: formData.fullName,
          email: formData.email,
          gradeLevel: gradeLevel_temp,
          phone: formData.phone,
          cpr: formData.cpr,
          school: school_temp,
          additional_data: formData.additional_data,
        },
        { headers: { 'X-CSRFToken': csrf.data.csrfToken } },
      )

      if (['Chair', 'Security', 'Press', 'Runner'].indexOf(type) != -1) {
        navigate('/success')
      } else {
        const number = res.data.id
        const padded_id = number.toString().padStart(4, '0')
        navigate('/confirm?id=' + padded_id)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-200 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Register as {type}</p>

                  <p
                    className="text-body-secondary"
                    dangerouslySetInnerHTML={{ __html: description_dictionary[type] }}
                  />

                  <CInputGroup className="mb-3">
                    <CInputGroupText style={{ textWrap: 'wrap' }}>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Full Name"
                      name="fullName"
                      autoComplete="fullname"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText style={{ textWrap: 'wrap' }}>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  {type != 'Security' && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormSelect
                          aria-label="Select Grade Level"
                          name="gradeLevel"
                          value={formData.gradeLevel}
                          onChange={handleChange}
                        >
                          <option>Select your grade level below</option>
                          {['Chair', 'Runner', 'Press'].indexOf(type) === -1 && (
                            <>
                              <option value="8">Grade 8 - Only for Bayan Students</option>
                              <option value="9">Grade 9</option>
                            </>
                          )}

                          <option value="10">Grade 10</option>
                          <option value="11">Grade 11</option>
                          <option value="12">Grade 12</option>
                        </CFormSelect>
                      </CInputGroup>
                    </>
                  )}

                  <p
                    className="text-body-secondary"
                    dangerouslySetInnerHTML={{ __html: message_desciption[type] }}
                  ></p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText style={{ textWrap: 'wrap' }}>+973</CInputGroupText>
                    <CFormInput
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText style={{ textWrap: 'wrap' }}>
                      <CIcon icon={cilCreditCard} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="CPR"
                      name="cpr"
                      autoComplete="cpr"
                      value={formData.cpr}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  {['Security', 'Runner'].indexOf(type) === -1 && (
                    <CInputGroup className="mb-3">
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        <CIcon icon={cilLibraryBuilding} />
                      </CInputGroupText>
                      <CFormSelect
                        aria-label="Default select example"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                      >
                        <option>Select your school below</option>
                        <option value="AH">Ahlia School</option>
                        <option value="AIS">AlNaseem International School</option>
                        <option value="ARS">Al Raja School</option>
                        <option value="AS">Alhussan School</option>
                        <option value="ASoB">American School of Bahrain</option>
                        <option value="APGS">Arabian Pearl Gulf School</option>
                        <option value="AKIS">Abdulrahman Kanoo International School</option>
                        <option value="AHIS">Al Hekma International School</option>
                        <option value="AIMANS">Al Iman School</option>
                        <option value="ANIS">Alnoor International School</option>
                        <option value="ARPS">Al Rawabi Private School</option>
                        <option value="BBS">Bahrain Bayan School</option>
                        <option value="BGS">Bayan Gardens School</option>
                        <option value="BIGS">Busaiteen Intermediate Girls School</option>
                        <option value="BPS">Beacon Private School</option>
                        <option value="BSoB">British School of Bahrain</option>
                        <option value="BIS">Britus International School</option>
                        <option value="CSB">Canadian School Bahrain</option>
                        <option value="CPS">Creativity Private School</option>
                        <option value="HIS">Hawar International School</option>
                        <option value="IKNS">Ibn Khuldoon National School</option>
                        <option value="MKS">Modern Knowledge Schools</option>
                        <option value="MSGS">Muharraq Secondary Girls School</option>
                        <option value="NIS">New Indian School</option>
                        <option value="NVTC">Nasser Vocational Training Centre</option>
                        <option value="NMS">New Millennium School</option>
                        <option value="OIS">Orbit International School</option>
                        <option value="RVIS">Riffa Views International School</option>
                        <option value="SHS">Sacred Heart School</option>
                        <option value="SCS">St Christopher's School</option>
                        <option value="SHGS">Shaikha Hissa Girls School</option>
                        <option value="SMCS">Shaikha Moza Comprehensive Girls School</option>
                        <option value="TIS">The Indian School</option>
                        <option value="TISoC">The International School of Choueifat</option>
                      </CFormSelect>
                    </CInputGroup>
                  )}

                  <CInputGroupText style={{ textWrap: 'wrap' }}>
                    Amount of MUN experiences and awards (if any):
                  </CInputGroupText>
                  <CInputGroup className="mb-3">
                    <CFormTextarea
                      id="exp"
                      placeholder="Experiences and Awards..."
                      rows={2}
                      name="munExperience"
                      value={formData.additional_data.munExperience}
                      onChange={handleChange}
                    ></CFormTextarea>
                  </CInputGroup>

                  <CInputGroupText style={{ textWrap: 'wrap' }}>
                    Do you have any health issues we should be aware of?
                  </CInputGroupText>
                  <CInputGroup className="mb-3">
                    <CFormTextarea
                      id="hlth"
                      placeholder="Health Issues..."
                      rows={2}
                      name="healthIssues"
                      value={formData.additional_data.healthIssues}
                      onChange={handleChange}
                    ></CFormTextarea>
                  </CInputGroup>

                  <CInputGroupText style={{ textWrap: 'wrap' }}>
                    Do you have any allergies we should be aware of?
                  </CInputGroupText>
                  <CInputGroup className="mb-3">
                    <CFormTextarea
                      id="alg"
                      placeholder="Alergies..."
                      name="allergies"
                      rows={2}
                      value={formData.additional_data.allergies}
                      onChange={handleChange}
                    ></CFormTextarea>
                  </CInputGroup>

                  {type === 'Security' && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>
                          <CIcon icon={cilFingerprint} />
                        </CInputGroupText>
                        <CFormInput
                          type="number"
                          id="id"
                          placeholder="School ID"
                          name="sec_1"
                          value={formData.additional_data.sec_1}
                          onChange={handleChange}
                          required
                        />
                      </CInputGroup>
                      <CInputGroupText style={{ textWrap: 'wrap' }} name="fitForPos">
                        Why do you think you are fit for this position?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="sec_2"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.sec_2}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        What are some safety procedures you would like to implement into this year's
                        security team?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="sec_3"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.sec_3}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        Why are you interested in the Security role?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="sec_4"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.sec_4}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>
                    </>
                  )}

                  {type === 'Runner' && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>
                          <CIcon icon={cilFingerprint} />
                        </CInputGroupText>
                        <CFormInput
                          type="number"
                          id="id"
                          placeholder="School ID"
                          name="run_1"
                          value={formData.additional_data.run_1}
                          onChange={handleChange}
                          required
                        />
                      </CInputGroup>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        Why do you think you are suitable for this position?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="run_2"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.run_2}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        What qualities differentiate you from others applying for this position?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="run_3"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.run_3}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>
                    </>
                  )}

                  {type === 'Chair' && (
                    <>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        What qualities do you possess that make you suitable for this position?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="cha_1"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.cha_1}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>

                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        What have you learnt from your past MUN experiences?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="cha_2"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.cha_2}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>
                          <CIcon icon={cilLanguage} />
                        </CInputGroupText>
                        <CFormSelect
                          aria-label="Default select example"
                          name="cha_3"
                          value={formData.additional_data.cha_3}
                          onChange={handleChange}
                        >
                          <option>Select the preferred language for your council</option>
                          <option value="EN">English</option>
                          <option value="AR">Arabic</option>
                        </CFormSelect>
                      </CInputGroup>
                    </>
                  )}

                  {type === 'Delegate' && (
                    <>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        Would you prefer to be in a specialized or general assembly council?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="del_1"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.del_1}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        Any other concerns you may have, that would like us to be aware of?
                        (confidential)
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="del_2"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.del_2}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>
                          <CIcon icon={cilLanguage} />
                        </CInputGroupText>
                        <CFormSelect
                          aria-label="Default select example"
                          name="del_5"
                          value={formData.additional_data.del_5}
                          onChange={handleChange}
                        >
                          <option>Select the prefered language for your council</option>
                          <option value="EN">English</option>
                          <option value="AR">Arabic</option>
                        </CFormSelect>
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Guardian's Full Name"
                          autoComplete="guardian fullname"
                          name="del_3"
                          value={formData.additional_data.del_3}
                          onChange={handleChange}
                          required
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>+973</CInputGroupText>
                        <CFormInput
                          placeholder="Guardian's Contact Number"
                          name="del_4"
                          value={formData.additional_data.del_4}
                          onChange={handleChange}
                          required
                        />
                      </CInputGroup>
                    </>
                  )}

                  {type === 'Press' && (
                    <>
                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        Amount of PRESS experiences (if any):
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          id="exp"
                          placeholder="Experiences as Press..."
                          rows={2}
                          name="pre_1"
                          value={formData.additional_data.pre_1}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>

                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        Why do you want to join the press team?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="pre_2"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.pre_2}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>

                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        What distinguishes you from other press applicants?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="pre_3"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.pre_3}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>

                      <CInputGroupText style={{ textWrap: 'wrap' }}>
                        What does photography mean to you?
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CFormTextarea
                          name="pre_4"
                          placeholder="Answer here..."
                          rows={2}
                          value={formData.additional_data.pre_4}
                          onChange={handleChange}
                        ></CFormTextarea>
                      </CInputGroup>

                      {/* <CInputGroupText style={{ textWrap: 'wrap' }}>
                        Upload 4 photos (preferably past MUN photos)
                      </CInputGroupText>
                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ textWrap: 'wrap' }}>
                          <CIcon icon={cilImage} />
                        </CInputGroupText>
                        <CFormInput type="file" id="formFileMultiple" multiple />
                      </CInputGroup> */}

                      <p className="text-body-secondary">
                        Note: Please email <b>4</b> photos (try to add MUN photos if you have any)
                        to <a href="mailto: baymun@bayanschool.edu.bh">baymun@bayanschool.edu.bh</a>
                      </p>
                    </>
                  )}

                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Register
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
