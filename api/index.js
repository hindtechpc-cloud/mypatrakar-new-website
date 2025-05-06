import axios from "axios";

const API = axios.create({
    // baseURL: "/api",  // Correct concatenation
    baseURL: "https://customer.mypatrakar.com/api/v1" // Correct concatenation
});

const X_Custom_Token = "aaaaa"
// get api

export const GetOwnerSocialLinks = async (portal_id) => {
    return await API.get("/social-media", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};


export const GetWebTheme = async (portal_id) => {
    return await API.get("/web-theme", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};

export const GetElectionYear = async (election_poll_id) => {
    return await API.post(
      "/election-years",
      { election_poll_id }, // send as JSON object
      {
        headers: {
          'X-Custom-Token': "aaaaa",
          'Content-Type': 'application/json'
        }
      }
    );
  };
  





// export const GetEllectionResult = async (year) => await API.post("/election-result", { year }, {
//     headers: {
//         'Authorization': X_Custom_Token
//     }
// });



export const NewsRoadMap = async () => await API.post("/news-road-map", {}, {
    headers: {
        'X-Custom-Token': X_Custom_Token
    }
}
);

export const GetPriceDetails = async () => await API.post("/pricing-in-my-patrakar", {}, {
    headers: {
        'Authorization': X_Custom_Token
    }
}
);


// export const GetFeature = async () => await API.get("/features-in-my-patrakar");
export const OrderDetails = async () => await API.get("/pricing-in-my-patrakar", {
    headers: {
        'Authorization': X_Custom_Token
    }
}
);
export const GetResources = async () => await API.get("/resources-in-my-patrakar", {
    headers: {
        'Authorization': X_Custom_Token
    }
});

export const ContactDetails = async () => await API.get("/contact", {
    headers: {
        'Authorization': X_Custom_Token
    }
}
);
export const CustomerProfile = async (id) => await API.post(`/get-customer-profile`, { customer_id: id }, {
    headers: {
        'Authorization': X_Custom_Token
    }
}
);
export const GetPortalList = async (customer_id) => await API.post(`/get-portal-list`, { customer_id: customer_id }, {
    headers: {
        'Authorization': X_Custom_Token
    }
}
);

// export const PaymentDetails = async () => await API.get("/payment-details");
export const BlogCategoryId = async () => await API.get("/blog-category", {
    headers: {
        'Authorization': X_Custom_Token
    }

});
export const FindBlogs = async (blog_category) => await API.post("/blog-by-category", blog_category,
    {
        headers: {
            'Authorization': X_Custom_Token
        }

    });
export const PrivacyAndPolicy = async () => await API.get("/privacy-policy", {
    headers: {
        'Authorization': X_Custom_Token
    }
});
export const Terms_Conditions = async () => await API.get("/term-condition", {
    headers: {
        'Authorization': X_Custom_Token
    }
});
// post api 
export const ContactSupport = async (data) => await API.post("/contact-support", data, {
    headers: {
        'Authorization': X_Custom_Token
    }
});
//for login 
export const LoginSendOtp = async (data) => await API.post("/auth-login", data, {
    headers: {
        'Authorization': X_Custom_Token
    }
});

export const VerifyLoginOtp = async (data) => await API.post("/auth-verify", data, {
    headers: {
        'Authorization': X_Custom_Token
    }
});

//for signup
export const SignupSendOtp = async (data) => await API.post("/send-signup-otp", data, {
    headers: {
        'Authorization': X_Custom_Token
    }
});

export const VerifySignUpOtp = async (data) => await API.post("/verify-signup-otp", data, {
    headers: {
        'Authorization': X_Custom_Token
    }
});
// for logout 
export const Logout = async (customer_id) => await API.post("/auth-logout", customer_id, {
    headers: {
        'Authorization': X_Custom_Token
    }
});



export const PackageByRegion = async (region) => await API.post("/package-by-region", region, {
    headers: {
        'Authorization': X_Custom_Token
    }
});
export const CreateNewPortal = async (data) => await API.post("/create-portal", data, {
    headers: {
        'Authorization': X_Custom_Token
    }
});
export const ApplyCoupon = async (data) => await API.post("/apply-coupon", data, {
    headers: {
        'Authorization': X_Custom_Token
    }
});
export const PaymentStatus = async () => await API.post("/make-payment", {
    headers: {
        'Authorization': X_Custom_Token
    }
});
export const PaymentMethod = async (data) => await API.post("/payment/payment-method", data);//customer card details
export const CreateAppOrWebCustomer = async (data) => await API.post("/portal/create-app-or-web", data,
    {
        headers: {
            'Authorization': X_Custom_Token
        }
    }
);

export const EncryptString = async (id) => await API.get(`/encrypt-string/:${id}`
    , {
        headers: {
            'Authorization': X_Custom_Token
        }
    }
);
export const DecryptString = async (id) => await API.get(`/decrypt-string/:${id}`
    , {
        headers: {
            'Authorization': X_Custom_Token
        }
    }
);



