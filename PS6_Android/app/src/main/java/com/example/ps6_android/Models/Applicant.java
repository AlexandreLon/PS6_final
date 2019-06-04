package com.example.ps6_android.Models;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Observable;

public class Applicant
{
    private int applicant_id;
    private String firstname;
    private String lastname;
    private boolean isTurn;

    public Applicant(int applicant_id, String firstname, String lastname, boolean isTurn)
    {
        this.applicant_id = applicant_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.isTurn = isTurn;
    }

    public Applicant()
    {
        this(0, "John", "Doe", false);
    }

    public Applicant(JSONObject object) throws JSONException
    {
        this(object.getInt("id"), object.getString("firstname"), object.getString("lastname"), false);
    }


    public int getApplicant_id() {
        return applicant_id;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public boolean isTurn() {
        return isTurn;
    }
}
