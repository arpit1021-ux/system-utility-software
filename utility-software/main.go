package main

import (
	"fmt"
	"log"
	"os"
	"runtime"
	"system-agent/collect"
	"system-agent/utils"
	"time"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	apiKey := os.Getenv("API_KEY")
	ownerID := os.Getenv("OWNER_ID")

	fmt.Println("Starting system agent...")

	if !utils.IsAdmin() {
		fmt.Println("This program must be run as administrator.")
		os.Exit(1)
	}

	if ownerID == "" {
		fmt.Println("OWNER_ID not set in .env. Please add your Supabase user UUID.")
		fmt.Println("Find it in: Supabase Dashboard -> Authentication -> Users")
		os.Exit(1)
	}

	if supabaseURL == "" || apiKey == "" {
		fmt.Println("SUPABASE_URL or API_KEY not set in .env.")
		os.Exit(1)
	}

	intervalMinutes := 30
	if val := os.Getenv("CHECK_INTERVAL_MINUTES"); val != "" {
		fmt.Sscanf(val, "%d", &intervalMinutes)
	}
	if intervalMinutes < 1 {
		intervalMinutes = 30
	}

	for i := 0; ; i++ {
		if i > 0 {
			fmt.Printf("\n--- Waiting %d minutes before next check ---\n", intervalMinutes)
			time.Sleep(time.Duration(intervalMinutes) * time.Minute)
		}

		fmt.Printf("\n[%s] Running system check #%d\n", time.Now().Format("2006-01-02 15:04:05"), i+1)

		info := collect.GetCommonInfo()
		switch runtime.GOOS {
		case "windows", "linux", "darwin":
			collect.CollectInfo(&info)
		default:
			fmt.Println("Unsupported platform")
			os.Exit(1)
		}

		info.OwnerID = ownerID

		fmt.Printf("Collected info: %+v\n", info)

		err = utils.SendToSupabase(&info, supabaseURL, apiKey)
		if err != nil {
			fmt.Println("Failed to send data:", err)
		} else {
			fmt.Println("System info sent successfully!")
		}
	}
}
