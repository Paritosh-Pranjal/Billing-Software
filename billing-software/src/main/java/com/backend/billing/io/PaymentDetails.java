package com.backend.billing.io;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDetails {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private enum PaymentStatus{
        PENDING,COMPLETE,FAILED
    }

}
