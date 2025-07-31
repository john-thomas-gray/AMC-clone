import GorditaText from "@/components/GorditaText";
import YoureAllSetHeader from "@/components/purchaseTickets/youreAllSet/YoureAllSetHeader";
import TicketQR from "@/components/QR/TicketQR";
import ShimmerOverlay from "@/components/ShimmerOverlay";
import { icons, images } from "@/constants";
import { fees, movieTicketPrice } from "@/constants/PriceConstants";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { checkPhoneNumber } from "@/utils/dateAndTime";
import { formatCalendarDate, formatRuntime } from "@/utils/formatMovieData";
import { generateTicketConfirmationNumber } from "@/utils/generateTicketConfirmationNumber";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const YoureAllSet = () => {
  const [confirmationNumber] = useState(() =>
    generateTicketConfirmationNumber()
  );

  const { setSelectedTickets, selectedTickets, paymentMethod, cartCostTotal } =
    useContext(PurchasesContext);
  const { selectedSession, loading } = useContext(TheatreDataContext);
  const { startTimer, stopTimer, resetTimer } = useContext(TimerContext);

  const router = useRouter();
  const [phoneNumber, onChangePhoneNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [addressArray, setAddressArray] = useState<string[]>(["", ""]);

  const allSelectedSeats = [
    ...selectedTickets.adult.seats,
    ...selectedTickets.child.seats,
    ...selectedTickets.senior.seats
  ];

  useEffect(() => {
    stopTimer();
  }, []);

  useEffect(() => {
    const valid = checkPhoneNumber(phoneNumber);
    setIsValidNumber(valid);
  }, [phoneNumber]);

  const noTicketsSelected = (["adult", "child", "senior"] as const).every(age =>
    Object.values(selectedTickets[age].tickets).every(
      ticket => ticket.count === 0
    )
  );

  useEffect(() => {
    if (noTicketsSelected) {
      const adultSeats = ["D3", "D4"];
      const childSeats = ["D5", "D6", "D7"];
      const seniorSeats = ["D8"];

      setSelectedTickets(prev => ({
        ...prev,
        adult: {
          ...prev.adult,
          seats: [...adultSeats],
          tickets: {
            standard: {
              cost: 0,
              count: 0
            },
            iMax: {
              cost: movieTicketPrice.adult,
              count: 2
            }
          }
        },
        child: {
          ...prev.child,
          seats: [...childSeats],
          tickets: {
            standard: {
              cost: 0,
              count: 0
            },
            iMax: {
              cost: movieTicketPrice.child,
              count: 3
            }
          }
        },
        senior: {
          ...prev.senior,
          seats: [...seniorSeats],
          tickets: {
            standard: {
              cost: 0,
              count: 0
            },
            iMax: {
              cost: movieTicketPrice.senior,
              count: 1
            }
          }
        }
      }));
    }
  }, [noTicketsSelected, movieTicketPrice, setSelectedTickets]);

  if (!selectedSession || loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <ShimmerOverlay
          source={images.loadingOneShimmer}
          imageSource={images.loadingOne}
          className="h-[100%] w-[100%]"
        />
      </SafeAreaView>
    );
  }

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const { theatre, screen, showtime } = selectedSession;
  const convenienceFee =
    screen.type.projector === "IMax"
      ? fees.convenienceFeeImax
      : fees.convenienceFee;

  const data = {
    movieTitle: screen?.movie?.title ?? "Unknown Movie Title",
    posterImage: screen?.movie?.poster_path
      ? `${BASE_IMAGE_URL}${screen.movie.poster_path}`
      : "https://via.placeholder.com/150x225",
    showtime: showtime ?? "9:30pm",
    projector: screen?.type?.projector ?? "IMax",
    id: screen?.movie?.id ?? 1,
    theatreName: theatre?.name ?? "Unknown Theatre",
    runtime: screen?.movie?.runtime ?? 120,
    genre: screen?.movie?.genres?.[0].name ?? "Unknown Genre",
    auditoriumNumber: screen?.number ?? 1,
    theatreAddressLineOne: addressArray[0] ?? "123 Fake Street",
    theatreAddressLineTwo: addressArray[1] ?? "San Francisco, CA 94115",
    selectedSeats: allSelectedSeats,
    paymentMethod: paymentMethod,
    cartCostTotal: cartCostTotal,
    confirmationNumber: confirmationNumber,
    convenienceFee: convenienceFee
  };

  return (
    <View className="flex-1 bg-black px-4">
      <YoureAllSetHeader />
      <ScrollView>
        <GorditaText className="text-sm text-gray-100 mb-8 mt-1">
          We emailed your receipt. See you at the movies!
        </GorditaText>

        {/* Movie Info Row */}
        <View className="flex-row pl-8 mb-4 mt-2">
          <Image
            source={{ uri: data.posterImage }}
            style={{ width: 90, height: 110 }}
            resizeMode="contain"
          />

          <View className="flex-1 ml-10">
            <GorditaText
              className="text-white font-gordita-bold text-2xl mb-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.movieTitle}
            </GorditaText>

            <View className="flex-row items-center mb-6">
              <GorditaText className="text-gray-100 font-gordita-regular">
                {formatRuntime(data.runtime)}{" "}
              </GorditaText>
              <Image source={icons.info} className="h-5 w-5" />
              <GorditaText className="text-gray-100 font-gordita-regular">
                {" "}
                {data.genre?.toLowerCase() === "horror" ? "R" : "PG-13"}{" "}
              </GorditaText>
              {data.genre?.toLowerCase() === "horror" && (
                <Image source={icons.info} className="h-5 w-5" />
              )}
            </View>

            <GorditaText
              className="text-white font-gordita-bold text-lg mb-2"
              style={{ lineHeight: 18 }}
            >
              Share & Meet Your Friends at AMC Theatres!
            </GorditaText>

            <View className="flex-row items-center mb-6">
              <Image source={icons.facebookBw} className="h-9 w-9 mx-0.5" />
              <Image source={icons.twitterBw} className="h-9 w-9 mx-0.5" />
            </View>

            <GorditaText className="text-gray-100 font-gordita-regular uppercase">
              TICKET CONFIRMATION #:
            </GorditaText>
            <GorditaText className="text-white font-gordita-regular text-lg">
              {data.confirmationNumber}
            </GorditaText>
          </View>
        </View>

        {/* QR Code */}
        <View className="w-full items-center justify-center mt-12 mb-8 relative">
          <View className="h-[150px] w-[150px] rounded-full bg-white" />
          <View className="absolute">
            <TicketQR />
          </View>
        </View>

        {/* Icon and Info Columns */}
        <View className="w-full items-center justify-center">
          <View className="flex-row gap-x-10 items-start mb-2">
            {/* Left Column: Icon */}
            <View className="flex-column  ml-10">
              <Image
                source={icons.ticketTabFocused}
                className="h-12 w-12 mt-[54]"
              />
              <Image
                source={icons.locationTabFocused}
                className="h-12 w-12 mt-[84]"
              />
              <Image source={icons.calendar} className="h-12 w-12 mt-[76]" />
              <Image
                source={icons.creditCard}
                className="h-12 w-12 mt-[58]"
                resizeMode="contain"
              />
            </View>

            {/* Right Column: GorditaText */}
            <View className="flex-column">
              <View className="mb-2">
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  TICKETS
                </GorditaText>

                {(["adult", "child", "senior"] as const).map(age => {
                  const totalCount = Object.values(
                    selectedTickets[age].tickets
                  ).reduce((sum, ticket) => sum + ticket.count, 0);

                  if (totalCount === 0) return null;

                  const pluralLabels: Record<string, string> = {
                    adult: "Adults",
                    child: "Children",
                    senior: "Seniors"
                  };

                  const label =
                    totalCount > 1
                      ? pluralLabels[age]
                      : age.charAt(0).toUpperCase() + age.slice(1);

                  return (
                    <GorditaText
                      key={age}
                      className="text-white font-gordita-regular text-lg"
                    >
                      {totalCount} {label}
                    </GorditaText>
                  );
                })}
              </View>

              <View>
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  AUDITORIUM
                </GorditaText>
                <GorditaText className="text-white font-gordita-regular text-lg mb-2 mb-2">
                  {data.auditoriumNumber}
                </GorditaText>
              </View>

              <View className="mb-3">
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  SEATS
                </GorditaText>
                <View className="flex-row items-center">
                  <GorditaText className="text-white font-gordita-regular text-lg mb-2">
                    {data.selectedSeats.join(", ")}
                  </GorditaText>
                  <Pressable>
                    <GorditaText className="font-gordita-bold text-blue-100 pb-1 pl-2">
                      View
                    </GorditaText>
                  </Pressable>
                </View>
              </View>

              <View className="mb-6">
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  THEATRE
                </GorditaText>
                <View className="flex-column">
                  <GorditaText className="text-white font-gordita-regular text-lg mb-1">
                    {data.theatreName}
                  </GorditaText>
                  <View className="flex-column">
                    <GorditaText
                      className="text-blue-100 text-sm"
                      style={{ lineHeight: 14 }}
                    >
                      {data.theatreAddressLineOne}
                    </GorditaText>
                    <GorditaText
                      className="text-blue-100 text-sm"
                      style={{ lineHeight: 14 }}
                    >
                      {data.theatreAddressLineTwo}
                    </GorditaText>
                  </View>
                </View>
              </View>

              <View>
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[8]">
                  DATE
                </GorditaText>
                <View className="flex-column">
                  <GorditaText
                    className="text-white font-gordita-regular text-lg"
                    style={{ lineHeight: 16 }}
                  >
                    {formatCalendarDate(selectedTickets.adult.date)}
                  </GorditaText>
                  <GorditaText
                    className="text-gray-100 text-sm mb-7"
                    style={{ lineHeight: 14 }}
                  >
                    at {selectedSession.showtime}
                  </GorditaText>
                  <Pressable>
                    <GorditaText className="text-blue-100 font-gordita-bold mb-10">
                      Add to calendar
                    </GorditaText>
                  </Pressable>
                </View>
              </View>

              <View>
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[6]">
                  PAYMENT
                </GorditaText>
                <GorditaText
                  className="text-white font-gordita-regular text-lg capitalize"
                  style={{ lineHeight: 16 }}
                >
                  {data.paymentMethod}
                </GorditaText>
                <GorditaText
                  className="text-gray-100 text-sm mb-7"
                  style={{ lineHeight: 14 }}
                >
                  ${data.cartCostTotal}
                </GorditaText>
              </View>
            </View>
          </View>
        </View>

        {/* Apple Wallet Icon */}
        <Pressable className="flex items-center pb-[40] border-b border-gray-300">
          <Image
            source={icons.appleWallet}
            className="h-14"
            resizeMode="contain"
          />
        </Pressable>

        <View className="py-10 border-b border-gray-300">
          <GorditaText className="text-white font-gordita-bold text-2xl pb-1">
            Send My Digital Tickets
          </GorditaText>

          <GorditaText className="text-sm text-gray-100 ">
            Add your number to get your ticket via text.
          </GorditaText>

          <GorditaText className="text-white font-gordita-bold text-lg mb-1">
            Phone Number
          </GorditaText>

          <TextInput
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            autoComplete="tel"
            className="mb-3"
            // caretHidden={true}
            inputMode="tel"
            style={[
              {
                height: 48,
                backgroundColor: "#191919",
                borderRadius: 5,
                color: "white",
                paddingLeft: 10
              }
            ]}
          />

          <Pressable
            disabled={!isValidNumber}
            onPress={() => {
              console.log("Text my tickets pressed");
            }}
          >
            <GorditaText
              className={`text-lg font-gordita-bold ${
                isValidNumber ? "text-blue-100" : "text-gray-200"
              }`}
            >
              Text My Tickets
            </GorditaText>
          </Pressable>
        </View>

        <View className="flex-column pb-6">
          <View className="pt-10 pb-6 ">
            <GorditaText className="text-white font-gordita-bold text-2xl pb-6">
              Order Details
            </GorditaText>

            <View className="flex-column pb-6">
              <View className="flex-column pb-5">
                <GorditaText className="text-gray-100 text-sm font-gordita-regular uppercase mb-3">
                  TICKETS
                </GorditaText>
                <View>
                  {(selectedTickets?.adult?.tickets?.standard?.count > 0 ||
                    selectedTickets?.adult?.tickets?.iMax?.count > 0) && (
                    <View className="flex-row justify-between mb-1">
                      <GorditaText className="font-gordita-bold">
                        {(selectedTickets?.adult?.tickets?.standard?.count ??
                          0) +
                          (selectedTickets?.adult?.tickets?.iMax?.count ??
                            0) ===
                        1
                          ? "Adult Ticket"
                          : `${
                              (selectedTickets?.adult?.tickets?.standard
                                ?.count ?? 0) +
                              (selectedTickets?.adult?.tickets?.iMax?.count ??
                                0)
                            } Adult Tickets`}
                      </GorditaText>

                      <GorditaText className="font-gordita-bold">
                        $
                        {(
                          (selectedTickets?.adult?.tickets?.standard?.cost ??
                            0) +
                          (selectedTickets?.adult?.tickets?.iMax?.cost ?? 0)
                        ).toFixed(2)}
                      </GorditaText>
                    </View>
                  )}

                  {(selectedTickets?.child?.tickets?.standard?.count > 0 ||
                    selectedTickets?.child?.tickets?.iMax?.count > 0) && (
                    <View className="flex-row justify-between mb-1">
                      <GorditaText className="font-gordita-bold">
                        {(selectedTickets?.child?.tickets?.standard?.count ??
                          0) +
                          (selectedTickets?.child?.tickets?.iMax?.count ??
                            0) ===
                        1
                          ? "Child Ticket"
                          : `${
                              (selectedTickets?.child?.tickets?.standard
                                ?.count ?? 0) +
                              (selectedTickets?.child?.tickets?.iMax?.count ??
                                0)
                            } Child Tickets`}
                      </GorditaText>

                      <GorditaText className="font-gordita-bold">
                        $
                        {(
                          selectedTickets?.child?.tickets?.standard?.cost *
                            selectedTickets?.child?.tickets?.standard?.count +
                          selectedTickets?.child?.tickets?.iMax?.cost *
                            selectedTickets?.child?.tickets?.iMax?.count
                        ).toFixed(2)}
                      </GorditaText>
                    </View>
                  )}

                  {(selectedTickets?.senior?.tickets?.standard?.count > 0 ||
                    selectedTickets?.senior?.tickets?.iMax?.count > 0) && (
                    <View className="flex-row justify-between mb-1">
                      <GorditaText className="font-gordita-bold">
                        {(selectedTickets?.senior?.tickets?.standard?.count ??
                          0) +
                          (selectedTickets?.senior?.tickets?.iMax?.count ??
                            0) ===
                        1
                          ? "Senior Ticket"
                          : `${
                              selectedTickets?.senior?.tickets?.standard
                                ?.count *
                                selectedTickets?.senior?.tickets?.standard
                                  ?.cost +
                              selectedTickets?.senior?.tickets?.iMax?.count *
                                selectedTickets?.senior?.tickets?.iMax?.cost
                            } Senior Tickets`}
                      </GorditaText>

                      <GorditaText className="font-gordita-bold">
                        $
                        {(
                          selectedTickets?.senior?.tickets?.standard?.cost *
                            selectedTickets?.senior?.tickets?.standard?.count +
                          selectedTickets?.senior?.tickets?.iMax?.cost *
                            selectedTickets?.senior?.tickets?.iMax?.count
                        ).toFixed(2)}
                      </GorditaText>
                    </View>
                  )}
                </View>
              </View>

              <View className="flex-column">
                <GorditaText className="text-gray-100 text-sm font-gordita-regular uppercase mb-3">
                  FEES
                </GorditaText>

                <View className="flex-row justify-between">
                  <GorditaText className="font-gordita-bold">
                    Convenience Fee
                  </GorditaText>

                  <GorditaText className="font-gordita-bold">
                    ${data.convenienceFee}
                  </GorditaText>
                </View>
              </View>
            </View>

            <View className="border-y border-gray-300 pt-4 pb-3">
              <View className="flex-row justify-between items-center">
                <GorditaText className="font-gordita-bold">Taxes</GorditaText>

                <GorditaText className="font-gordita-bold">$0.00</GorditaText>
              </View>
            </View>
            <View className="flex-row justify-end items-center pb-12 pt-6">
              <View className="mr-2 ">
                <GorditaText className="text-md text-gray-100 uppercase">
                  TOTAL
                </GorditaText>
              </View>

              <GorditaText className="font-gordita-bold">
                ${data.cartCostTotal}
              </GorditaText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default YoureAllSet;
