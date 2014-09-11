using System;
using System.Collections.Generic;

namespace Conch
{
    /// <summary>
    /// Summary description for Slide
    /// </summary>
    public class Slide
    {
        public Slide(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Name must not be blank.");
            this.Name = name;
        }
        public string Name { get; private set; }
        public string Title { get; set; }
        public string TemplateUrl { get; set; }
    }

    public class SlideCollection
    {
        public IList<Slide> Slides { get; set; }
    }
}