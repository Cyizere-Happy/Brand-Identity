import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const Content = () => {
  return (
    <div className="content-wrapper">
      {/* PAGE 0: SPAING HERO */}
      <section className="section section-hero">
        <div className="hero-top-left">
           <div className="promo-video">
              <div className="play-btn"><Play size={10} fill="white" /></div>
              <span>Promotion video</span>
           </div>
        </div>

        <div className="hero-bg-text">SPAING</div>

        <div className="hero-bottom-container">
          <div className="hero-price-block">
            <span className="price-label">$34.99</span>
            <span className="price-subtext">SIZE: 29.5" • OFFICIAL</span>
          </div>
          
          <div className="hero-cta-block">
            <button className="add-to-cart-btn">ADD TO CART</button>
          </div>
          
          <div className="hero-nav-block">
             <div className="slider-arrows">
                <div className="arrow-btn prev"><ChevronLeft size={16} /></div>
                <div className="arrow-btn next active"><ChevronRight size={16} /></div>
             </div>
          </div>
        </div>
      </section>

      {/* PAGE 1: ELITE CONTROL */}
      <section className="section section-split">
        <div className="layout-detail-left">
          <div className="metric-group">
            <p className="label-orange">• PERFORMANCE METRICS</p>
            <h2 className="title-medium">ELITE<br/>CONTROL</h2>
          </div>
          <div className="stat-block">
            <h3>100%</h3>
            <p className="stat-label">MICROFIBER COMPOSITE</p>
            <p className="stat-desc">Exclusive coating material providing superior grip management in all weather conditions.</p>
          </div>
          <div className="stat-block">
            <h3>0.5mm</h3>
            <p className="stat-label">PEBBLE DEPTH</p>
            <p className="stat-desc">Optimized surface texture for precision handling and rotational feedback.</p>
          </div>
        </div>
        <div className="spacer"></div>
      </section>

      {/* PAGE 2: PERFECT FLIGHT */}
      <section className="section section-split">
        <div className="spacer"></div>
        <div className="layout-detail-right">
          <div className="metric-group">
            <p className="label-light">AERODYNAMICS</p>
            <h2 className="title-medium">PERFECT<br/>FLIGHT</h2>
          </div>
          <div className="stat-block-inline">
            <div className="stat-val">0.85</div>
            <p className="stat-label">DRAG COEFFICIENT</p>
            <div className="dot-radar"></div>
          </div>
          <div className="stat-block-inline">
            <div className="stat-val">28.5</div>
            <p className="stat-label">ROTATIONAL STABILITY</p>
            <div className="dot-radar"></div>
          </div>
          <p className="stat-desc">Symmetrically balanced weight distribution ensures true flight path and consistent rotation speed, critical for long-range precision.</p>
        </div>
      </section>

      {/* PAGE 3: HUD / MICRO-TEXTURE */}
      <section className="section section-hud">
        <div className="hud-labels">
          <div className="hud-label left-top">
             <div className="line-pointer"></div>
             <p className="stat-label">MICRO-TEXTURE</p>
             <h3 className="hud-value">1.2mm</h3>
             <p className="stat-label">PEBBLE HEIGHT</p>
          </div>
          <div className="hud-label right-bottom">
             <h3 className="hud-value">High-Tack</h3>
             <p className="stat-label">COATING SPEC</p>
             <div className="line-pointer right"></div>
          </div>
          <div className="hud-meta left-mid">ELEVATION: 12.8°</div>
          <div className="hud-meta right-mid">AZIMUTH: 45.2°</div>
          <div className="hud-meta-bottom">CHANNEL DEPTH</div>
        </div>
      </section>

      {/* PAGE 4: THE CHAMPION (PODIUM) */}
      <section className="section section-podium">
        <div className="layout-champion">
          <div className="podium-header">
            <p className="subtitle-podium">LIMITED EDITION</p>
            <h1 className="title-champion">THE CHAMPION</h1>
          </div>
          
          <div className="podium-stats">
            <div className="podium-stat-left">
              <p className="label-orange">RANK 01</p>
              <h4>Elite Tier</h4>
              <p className="stat-desc-small">Constructed for the highest level of competition.</p>
            </div>
            
            <div className="podium-stat-right">
              <p className="label-orange">CERTIFIED</p>
              <h4>Gold Standard</h4>
              <p className="stat-desc-small">Meets all regulation weight and size requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 5: DEFY GRAVITY */}
      <section className="section section-cta">
        <div className="layout-cta">
          <p className="label-orange-bg">NEXT LEVEL PERFORMANCE</p>
          <h1 className="title-huge">DEFY<br/>GRAVITY</h1>
          <button className="shop-button">SHOP COLLECTION</button>
          
          <div className="footer-links">
            <div className="footer-item">• OFFICIAL STORE</div>
            <div className="footer-item">• GLOBAL SHIPPING</div>
            <div className="social-icons">
               <span>𝕏</span> <span>🌐</span> <span>▶</span>
            </div>
            <div className="footer-item">SECURE CHECKOUT</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
