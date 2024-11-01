import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Props {
  data: {
    code: string;
    name: string;
    programCode: string;
    schedule: {
      [key: string]: {
        end: string;
        start: string;
      };
    };
    roomID: string;
    faculty: string;
    facultyID: string;
    facultyEmail: string;
    facultyAvatar: string;
  }[];
}

export default function GoogleCalendarWeekly(props: Props) {
  const getClassesForDay = (day: string) => {
    return props.data
      .filter((routine) => routine.schedule[day])
      .map((routine) => ({
        ...routine,
        startTime: routine.schedule[day].start,
        endTime: routine.schedule[day].end,
      }));
  };

  const calculateCellPosition = (startTime: string, endTime: string) => {
    const getHourAndMinutes = (time: string) => {
      const [hour, minutes] = time.split(":").map(Number);
      return hour + minutes / 60;
    };

    const startHour = getHourAndMinutes(startTime);
    const endHour = getHourAndMinutes(endTime);

    const top = (startHour - 8) * 60;
    const height = (endHour - startHour) * 60;

    return { top: `${top}px`, height: `${height}px` };
  };

  return (
    <Card className="w-full overflow-hidden shadow-none">
      <CardContent className="p-0">
        <div className="grid grid-cols-[80px_repeat(7,1fr)] divide-x divide-border border-b bg-primary text-primary-foreground">
          <div className="sticky left-0 p-2 text-center font-medium">Time</div>
          {days.map((day) => (
            <div key={day} className="p-2 text-center font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-[80px_repeat(7,1fr)] divide-x divide-border">
          <div className="bg-background">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-[60px] border-b p-2 text-center text-xs"
              >
                <div className="-mt-2">
                  {time.split(":")[0] === "12"
                    ? "12 PM"
                    : parseInt(time) < 12
                    ? `${parseInt(time)}${parseInt(time) === 12 ? "" : " AM"}`
                    : `${parseInt(time) - 12}${
                        parseInt(time) === 12 ? "" : " PM"
                      }`}
                </div>
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day} className="relative">
              {getClassesForDay(day).map((classInfo, index) => (
                <Card
                  key={`${classInfo.code}-${index}_card_xy`}
                  style={calculateCellPosition(
                    classInfo.startTime,
                    classInfo.endTime
                  )}
                  className="absolute left-0 right-0 m-1 overflow-hidden text-xs hover:bg-primary/20 bg-secondary text-secondary-foreground shadow-none"
                >
                  <CardContent className="p-3">
                    <div className="flex-col items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>
                          {classInfo.startTime} - {classInfo.endTime}
                        </span>
                      </div>
                      <Badge className="text-xs">{classInfo.code}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={classInfo.facultyAvatar}
                          alt={classInfo.faculty}
                        />
                        <AvatarFallback>
                          {classInfo.faculty.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {classInfo.faculty}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {timeSlots.map((_, index) => (
                <div key={index} className="h-[60px] border-b" />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
