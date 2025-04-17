'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthLayout from "@layouts/AuthLayout";
import AuthHeader from "@components/AuthHeader";
import SubmitButton from "@components/Button";
import BackButton from "@components/BackButton";
import FormInput from "@components/FormInput";
import styles from "@styles/Login.module.css";
import progressStyles from "@styles/ProgressBar.module.css";
import { useAuth } from "@hooks/useAuth";


const Register = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const { register, isLoading, message, error, clearError } = useAuth();

  // Business Info
  const [organization_name, setOrganization_name] = useState("");
  const [organization_address, setOrganization_address] = useState("");
  const [organization_email, setOrganization_email] = useState("");
  const [organization_phone, setOrganization_phone] = useState("");

  // Personal Info
  const [full_name, setFull_name] = useState("");
  const [personal_email, setPersonal_email] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = async(e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else {      
      await register({
        organization_name,
        organization_address,
        organization_email,
        organization_phone,
        full_name,
        personal_email,
        password
      });
    }
  };

  const handleBack = () => {
    if (step === 1) router.back();
    else setStep(step - 1);
  };

  const renderProgressBar = () => {
    const progressWidth = step === 2 ? "100%" : "50%";
  
    return (
      <div className={progressStyles.progress_container}>
        <div className={progressStyles.progress_wrapper}>
          <div
            className={`${progressStyles.progress_step} ${
              step >= 1 ? progressStyles.active : ""
            }`}
          >
            1
          </div>
          <div className={progressStyles.progress_line}>
            <span
              style={{
                content: '""',
                position: "absolute",
                height: "100%",
                backgroundColor: "#4361ee",
                transition: "width 0.3s ease",
                zIndex: 2,
                width: progressWidth,
              }}
            ></span>
          </div>
          <div
            className={`${progressStyles.progress_step} ${
              step >= 2 ? progressStyles.active : ""
            }`}
          >
            2
          </div>
        </div>
        <div className={progressStyles.progress_labels}>
          <span>Business Info</span>
          <span>Personal Info</span>
        </div>
      </div>
    );
  };
  

  return (
    <AuthLayout>
      <AuthHeader
        title="Create an Account"
        subtitle="Just a few steps to get started"
      />
      
      {renderProgressBar()}

      <form className={styles.login_form} onSubmit={handleNext}>
      {error && <div className={styles.error} onClick={clearError}>{error}</div>}
      {message && <div className={styles.success}>{message}</div>}
        {step === 1 && (
          <>
            <FormInput
              type="text"
              placeholder="Enter your Business name"
              value={organization_name}
              label="Business Name"
              onChange={(e) => setOrganization_name(e.target.value)}
            />
            <FormInput
              type="address"
              placeholder="Enter your Business address"
              value={organization_address}
              label="Business Address"
              onChange={(e) => setOrganization_address(e.target.value)}
            />
            <FormInput
              type="email"
              placeholder="Enter your Business email"
              value={organization_email}
              label="Business Email"
              required
              onChange={(e) => setOrganization_email(e.target.value)}
            />
            <FormInput
              type="phone"
              placeholder="Enter your Business phone number"
              value={organization_phone}
              label="Business Phone Number"
              onChange={(e) => setOrganization_phone(e.target.value)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <FormInput
              type="text"
              placeholder="Enter your Full Name"
              value={full_name}
              label="Full Name"
              onChange={(e) => setFull_name(e.target.value)}
            />
            <FormInput
              type="email"
              placeholder="Enter your Personal Email"
              value={personal_email}
              label="Personal Email"
              required
              onChange={(e) => setPersonal_email(e.target.value)}
            />
            <FormInput
              type="password"
              placeholder="Create a Password"
              value={password}
              label="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <div className={styles.form_actions}>

          <SubmitButton
            type="submit"
            text={step === 1 ? "Next" : "Register"}
            isLoading={isLoading}
            loadingText="Processing..."
          />
        </div>
      </form>

        <BackButton
            onClick={handleBack}
            label={step === 1 ? "Back" : "Previous Step"}
            className={styles.back_button}
            style={{ marginTop: "20px"}}
        />

<div className={styles.signup_link}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Back to login
          </Link>
        </div>
    </AuthLayout>
  );
};

export default Register;
