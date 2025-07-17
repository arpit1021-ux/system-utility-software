package main

import (
	"fmt"
	"os"
	"runtime"
	"bufio"
	"strings"
	"system-agent/collect"
	"system-agent/utils"
	"github.com/joho/godotenv"
	"log"
)

var supabaseURL string
var apiKey string

func main() {

	err := godotenv.Load();
	if err != nil {
		log.Println("No .env file found")
	}


	supabaseURL = os.Getenv("SUPABASE_URL")
	apiKey      = os.Getenv("API_KEY")
	
	fmt.Println("Starting system agent...")

	if !utils.IsAdmin() {
		fmt.Println("This program must be run as administrator.")
		os.Exit(1)
	}

	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter your Owner ID: ")
	ownerID, err := reader.ReadString('\n')
	if err != nil {
		fmt.Println("Error reading input:", err)
		return
	}

	ownerID = strings.TrimSpace(ownerID)	

	info := collect.GetCommonInfo()
	fmt.Print("executing Collect info :")
	switch runtime.GOOS {
	case "windows":
		collect.CollectInfo(&info)
	case "linux":
		collect.CollectInfo(&info)
	case "darwin":
		collect.CollectInfo(&info)
	default:
		fmt.Println("Unsupported platform")
	}

	info.OwnerID=ownerID

	fmt.Printf("Collected info: %+v\n", info)

	err = utils.SendToSupabase(&info,supabaseURL,apiKey)
	if err != nil {
		fmt.Println("Failed to send data:", err)
	} else {
		fmt.Println("System info sent successfully!")
	}
}
