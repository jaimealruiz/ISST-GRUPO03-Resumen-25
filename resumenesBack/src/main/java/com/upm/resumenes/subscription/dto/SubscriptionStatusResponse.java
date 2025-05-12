package com.upm.resumenes.subscription.dto;

import java.time.LocalDate;

public record SubscriptionStatusResponse(boolean active, LocalDate endDate) {}
