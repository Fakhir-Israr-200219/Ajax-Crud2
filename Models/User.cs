﻿using System;
using System.Collections.Generic;

namespace Ajax_Crud2.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
