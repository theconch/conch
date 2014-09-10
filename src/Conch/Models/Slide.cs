using System;
using System.Collections.Generic;

namespace Conch
{
    /// <summary>
    /// Summary description for Slide
    /// </summary>
    public class Slide
    {
        public string Title { get; set; }
        public string TemplateUrl { get; set; }
    }

    public class SlideCollection
    {
        public IList<Slide> Slides { get; set; }
    }
}