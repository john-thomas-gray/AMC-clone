import { useRef, useState } from "react";
import { Button, Dimensions, ScrollView, Text, View } from "react-native";
import { normalizeFont } from "../utils/normalizeFont";

const { width } = Dimensions.get("window");

export default function Home() {
  const [stepsCompleted, setStepsCompleted] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const screenPadding = 20;
  const stepFormWidth = width - screenPadding * 2;

  const handlePressNextStep = (currentStep: string, nextStep: string) => {
    setStepsCompleted((prevState) =>
      prevState.includes(currentStep) ? prevState : [...prevState, currentStep],
    );

    const formSteps = {
      account: stepFormWidth,
      personal: stepFormWidth * 2,
      complete: stepFormWidth * 3,
    };

    scrollRef?.current?.scrollTo({
      x: formSteps[nextStep as keyof typeof formSteps],
    });
  };

  const handlePressBackButton = (currentStep: string, previousStep: string) => {
    setStepsCompleted((prevState) =>
      prevState.filter((step) => step !== currentStep && step !== previousStep),
    );

    const formSteps = {
      welcome: 0,
      account: stepFormWidth,
    };

    scrollRef?.current?.scrollTo({
      x: formSteps[previousStep as keyof typeof formSteps],
    });
  };

  return (
    // Screen Container
    <View
      style={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Sign Up Container */}
      <View
        style={{
          width: "100%",
          borderRadius: 2,
          backgroundColor: "#2d0381",
        }}
      >
        {/* Header */}
        <View
          style={{
            gap: 20,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: normalizeFont(20),
              color: "#FAF9F6",
              textTransform: "capitalize",
            }}
          >
            Create account steps
          </Text>

          {/* Steps Indicator Container */}
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* StepIndicator Line */}
            <View
              style={{
                position: "absolute",
                height: 1,
                width: "100%",
                backgroundColor: "#FAF9F6",
              }}
            />

            {/* StepIndicator Label Wrapper - Welcome */}
            <View
              style={{
                maxWidth: 100,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: stepsCompleted.includes("welcome")
                  ? "#22c55e"
                  : "#9ca3af",
              }}
            >
              <Text
                style={{
                  fontSize: normalizeFont(12),
                  color: "#FAF9F6",
                  fontWeight: "bold",
                }}
              >
                Welcome Step
              </Text>
            </View>

            {/* StepIndicator Label Wrapper - Account Information */}
            <View
              style={{
                maxWidth: 100,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: stepsCompleted.includes("account")
                  ? "#22c55e"
                  : "#9ca3af",
              }}
            >
              <Text
                style={{
                  fontSize: normalizeFont(12),
                  color: "#FAF9F6",
                  fontWeight: "bold",
                }}
              >
                Account Information
              </Text>
            </View>

            {/* StepIndicator Label Wrapper - Personal Information */}
            <View
              style={{
                maxWidth: 100,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: stepsCompleted.includes("personal")
                  ? "#22c55e"
                  : "#9ca3af",
              }}
            >
              <Text
                style={{
                  fontSize: normalizeFont(12),
                  color: "#FAF9F6",
                  fontWeight: "bold",
                }}
              >
                Personal Information
              </Text>
            </View>

            {/* Divisor */}
            <View
              style={{
                position: "absolute",
                bottom: -20,
                height: 1,
                width: "100%",
                backgroundColor: "#9ca3af",
              }}
            />
          </View>
        </View>

        {/* Content Container */}
        <ScrollView
          style={{
            flexGrow: 0,
            alignContent: "center",
          }}
          contentContainerStyle={{
            flexGrow: 1,
            position: "relative",
          }}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          ref={scrollRef}
        >
          <View
            style={{
              width: stepFormWidth,
              backgroundColor: "gray",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 160,
            }}
          >
            <Text style={{ color: "white", fontSize: normalizeFont(30) }}>
              Welcome (Step 1)
            </Text>
            <Button
              title="continue"
              color="#000"
              onPress={() => {
                handlePressNextStep("welcome", "account");
              }}
            />
          </View>

          <View
            style={{
              width: stepFormWidth,
              backgroundColor: "green",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 160,
            }}
          >
            <Button
              title="previous step"
              color="#000"
              onPress={() => {
                handlePressBackButton("account", "welcome");
              }}
            />
            <Text style={{ color: "white", fontSize: normalizeFont(30) }}>
              Account Information (Step 2)
            </Text>
            <Button
              title="next step"
              color="#000"
              onPress={() => {
                handlePressNextStep("account", "personal");
              }}
            />
          </View>

          <View
            style={{
              width: stepFormWidth,
              backgroundColor: "orange",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 160,
            }}
          >
            <Button
              title="previous step"
              color="#000"
              onPress={() => {
                handlePressBackButton("personal", "account");
              }}
            />
            <Text style={{ color: "white", fontSize: normalizeFont(30) }}>
              Personal Information (Step 3)
            </Text>

            <Button
              title="next step"
              color="#000"
              onPress={() => {
                handlePressNextStep("personal", "complete");
              }}
            />
          </View>

          <View
            style={{
              width: stepFormWidth,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 160,
            }}
          >
            <Text style={{ color: "white", fontSize: normalizeFont(30) }}>
              Complete (Step 4)
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
